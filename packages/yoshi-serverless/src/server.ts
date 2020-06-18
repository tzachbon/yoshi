import path from 'path';
import { parse as parseUrl } from 'url';
// @ts-ignore - missing types
import fs from 'fs-extra';
import globby from 'globby';
import importFresh from 'import-fresh';
import project from 'yoshi-config';
import { FullHttpResponse, WebResponse, WebRequest } from '@wix/serverless-api';
import { ROUTES_BUILD_DIR, BUILD_DIR } from 'yoshi-config/build/paths';
import { RouteFunction, InitServerFunction } from './types';
import { pathMatch, connectToYoshiServerHMR, buildRoute } from './utils';

export type Route = {
  route: string;
  handler: (req: WebRequest, params: { [param: string]: any }) => void;
};

export default class Server {
  private context: any;
  private config: any;
  private routes: Array<Route>;
  private initData: any;

  constructor(context: any) {
    this.context = context;
    try {
      this.config = context.config.load(
        // strip organization name from package name
        project.name.slice(project.name.indexOf('/') + 1),
      );
    } catch (e) {
      // do nothing
    }
    this.routes = this.createRoutes();

    if (process.env.NODE_ENV === 'development') {
      const socket = connectToYoshiServerHMR();

      socket.onmessage = async () => {
        try {
          this.routes = this.createRoutes();
        } catch (error) {
          socket.send(JSON.stringify({ success: false }));
        }

        socket.send(JSON.stringify({ success: true }));
      };
    }
  }

  static async create(context: any) {
    const server = new Server(context);
    await server.initServer();
    return server;
  }

  private initServer: () => Promise<void> = async () => {
    const initServerPath = path.resolve(BUILD_DIR, 'init-server.js');

    if (await fs.pathExists(initServerPath)) {
      const chunk = importFresh(initServerPath) as InitServerFunction;

      this.initData = await chunk(this.context);
    }
  };

  public handle = async (req: WebRequest): Promise<WebResponse> => {
    try {
      const { pathname } = parseUrl(req.path as string, true);

      for (const { handler, route } of this.routes) {
        const params = pathMatch(
          route,
          // for Businss Manager apps, routes are mapped (in Fryingpan or BM testkit):
          // '/_api/projectName/_api_' -> '/api/_api_'
          pathname?.replace('/api/_api_', '/_api_') as string,
        );

        if (params) {
          return await handler(req, params);
        }
      }
    } catch (error) {
      return '500';
    }

    return '404';
  };

  private createRoutes(): Array<Route> {
    const routesBuildDir = path.resolve(__dirname, ROUTES_BUILD_DIR);

    const serverChunks = globby.sync('**/*.js', {
      cwd: routesBuildDir,
      absolute: true,
    });

    return serverChunks.map((absolutePath) => {
      // @ts-ignore
      const chunk = __non_webpack_require__(absolutePath) as RouteFunction<any>;
      const route = buildRoute(absolutePath);
      return {
        route,
        handler: async (req, params) => {
          const fnThis = {
            context: this.context,
            req,
            params,
            initData: this.initData,
            config: this.config,
          };

          const result = await chunk.call(fnThis);
          if (result) {
            const webResponse: WebResponse = { body: result, status: 200 };
            return new FullHttpResponse(webResponse);
          }
        },
      };
    });
  }
}
