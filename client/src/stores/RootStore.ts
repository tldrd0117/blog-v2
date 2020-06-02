import AuthStore from "./AuthStore";

export default class RootStore{
    authStore = new AuthStore(this);
}