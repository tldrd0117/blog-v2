import AuthStore from "./AuthStore";
import PostStore from "./PostStore";
import ErrorStore from "./ErrorStore";

export default class RootStore{
    errorStore = new ErrorStore(this);
    authStore = new AuthStore(this);
    postStore = new PostStore(this);
}