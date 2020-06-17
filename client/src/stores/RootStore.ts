import AuthStore from "./AuthStore";
import PostStore from "./PostStore";

export default class RootStore{
    authStore = new AuthStore(this);
    postStore = new PostStore(this);
}