import Component from "@ember/component";
import { inject as service } from "@ember/service";
// import { defaultHomepage } from "discourse/lib/utilities";
// import { and } from "@ember/object/computed";
import discourseComputed, { observes } from "discourse-common/utils/decorators";

export default Component.extend({
  router: service(),
  tagName: "",

  @discourseComputed("router.currentRouteName")
  displayForRoute(currentRouteName) {
    return currentRouteName === "discovery.latest" // && !currentRouteName.startsWith("admin.")
  },

  shouldDisplay: "displayForRoute",

  // Setting a class on <html> from a component is not great
  // but we need it for backwards compatibility
  @observes("shouldDisplay")
  displayChanged() {
    document.documentElement.classList.toggle(
      "display-category-list",
      this.shouldDisplay
    );
  },

  didInsertElement() {
    this.displayChanged();
  },

  didDestroyElement() {
    document.documentElement.classList.remove("display-category-list");
  },
});
