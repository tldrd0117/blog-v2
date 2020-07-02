import AuthStore from "./AuthStore";
import PostStore from "./PostStore";
import ErrorStore from "./ErrorStore";
import ScrollStore from "./ScrollStore";

export default class RootStore{
    errorStore = new ErrorStore(this);
    authStore = new AuthStore(this);
    postStore = new PostStore(this);
    scrollStore = new ScrollStore(this);
}