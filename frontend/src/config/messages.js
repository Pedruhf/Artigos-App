import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
  iconPack: "fontawesome",
  duration: 3000,
});

Vue.toasted.register(
  "defaultSuccess",
  (payload) =>
    !payload.msg ? "A operação foi realizada com sucesso!" : payload.msg,
  { type: "success", icon: "check" }
);

Vue.toasted.register(
  "defaultError",
  (payload) =>
    !payload.msg ? "Erro ao tentar realizar a operação!" : payload.msg,
  { type: "error", icon: "times" }
);
