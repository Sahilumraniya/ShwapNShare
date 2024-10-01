import auth, {
    AuthenticationClient,
    AuthenticationClientOptions,
} from "@feathersjs/authentication-client";
import { CookieStorage } from "cookie-storage";
import rest from "@feathersjs/rest-client";
import Axios from "axios";
import feathers from "@feathersjs/feathers";
import { ApiRoutes } from "./routes";
import conf from "../conf/conf";

/**
 * CookieStorage
 * @type {CookieStorage}
 */

export const cookieStorage = new CookieStorage();

console.log("Test ::", conf.baseUrl);

const restClient = rest(conf.baseUrl);

// const socketClient = io(process.env.baseUrl);

export const authCookieName = conf.cookieName ?? "cookie";
export const loginTime = "login-time";

/**
 * Feathers application
 */

export const restApp = feathers();

restApp.configure(restClient.axios(Axios));

// restApp.configure(socketio(socketClient, {}));
// feathers().configure(socketio(socketClient, {}))

class MyAuthenticationClient extends AuthenticationClient {
    getFromLocation(location) {
        // Do custom location things here
        return super.getFromLocation(location);
    }
}

const options = {
    path: ApiRoutes.authentication,
    storageKey: authCookieName,
    storage: cookieStorage,
    header: "authorization",
    scheme: "Bearer",
    locationKey: authCookieName,
    locationErrorKey: "error",
    jwtStrategy: "jwt",
    Authentication: MyAuthenticationClient,
};
restApp.configure(auth(options));

export default restApp;

export const authenticationService = restApp.service(ApiRoutes.authentication);
export const userService = restApp.service(ApiRoutes.user);
export const productService = restApp.service(ApiRoutes.product);
export const getUploadUrlService = restApp.service(ApiRoutes.getUploadUrl);
export const uploadService = restApp.service(ApiRoutes.upload);
export const accessTokenService = restApp.service(ApiRoutes.accesToken);
export const roomTokenService = restApp.service(ApiRoutes.room);