import * as TodoActionCreators from "./todo";
import * as PostActionCreators from "./postAction";
import * as LaptopActionCreators from "./laptopActions";
import * as AuthActionCreators from "./authActions";

export default {
  ...TodoActionCreators,
  ...PostActionCreators,
  ...LaptopActionCreators,
  ...AuthActionCreators,
};
