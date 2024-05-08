import { DOMWrapper, mount } from "@vue/test-utils";
import HotelCard from "@/components/HotelCard.vue";
import { expect, test } from "vitest";
import { BaseCard } from "@/components/ui/card";
import { BaseInput } from "@/components/ui/input";
import { BaseButton } from "@/components/ui/button";
import {
  BaseDialog,
  BaseDialogClose,
  BaseDialogContent,
  BaseDialogDescription,
  BaseDialogFooter,
  BaseDialogHeader,
  BaseDialogScrollContent,
  BaseDialogTitle,
  BaseDialogTrigger,
} from "@/components/ui/dialog";
import { nextTick } from "vue";
import { BaseTabs, BaseTabsContent, BaseTabsList } from "@/components/ui/tabs";

const baseComponents = {
  BaseCard: BaseCard,
  BaseInput: BaseInput,
  BaseButton: BaseButton,
  BaseDialog: BaseDialog,
  BaseDialogTrigger: BaseDialogTrigger,
  BaseDialogClose: BaseDialogClose,
  BaseDialogHeader: BaseDialogHeader,
  BaseDialogTitle: BaseDialogTitle,
  BaseDialogDescription: BaseDialogDescription,
  BaseDialogContent: BaseDialogContent,
  BaseDialogScrollContent: BaseDialogScrollContent,
  BaseDialogFooter: BaseDialogFooter,
  BaseTabs: BaseTabs,
  BaseTabsList: BaseTabsList,
  BaseTabsContent: BaseTabsContent,
  BaseTabsTrigger: BaseDialogTrigger,
};

test("displays information about hotel", () => {
  const wrapper = mount(HotelCard, {
    global: {
      components: baseComponents,
    },
    props: {
      hotel: {
        id: 1,
        name: "Hotel 1",
        rating: 4,
        stars: 4,
        address: "Address 1",
        photo: "photo1",
        price: 100,
        description: "Description 1",
        reviews: [],
      },
    },
  });

  expect(wrapper.text()).toContain("Hotel 1");
  expect(wrapper.text()).toContain("Address 1");
  expect(wrapper.text()).toContain("4");
  expect(wrapper.text()).toContain("S$100/night");
});

test("displays information about hotel with reviews", async () => {
  const wrapper = mount(HotelCard, {
    global: {
      components: baseComponents,
    },
    props: {
      hotel: {
        id: 1,
        name: "Hotel 1",
        rating: 4,
        stars: 4,
        address: "Address 1",
        photo: "photo1",
        price: 100,
        description: "Description 1",
        reviews: [
          {
            rating: 5,
            user: {
              name: "User 1",
              location: "Location 1",
            },
            title: "Review 1",
            description: "Description 1",
          },
          {
            user: {
              name: "User 2",
              location: "Location 2",
            },
            rating: 3,
            title: "Review 2",
            description: "Description 2",
          },
        ],
      },
    },
  });

  await wrapper.find("button").trigger("click");
  const dialog = wrapper.findComponent("[id^='radix-vue-dialog-content-']");

  expect(dialog.html()).toContain("Review 1");
  expect(dialog.html()).toContain("Review 2");
});

test("filters reviews by text search", async () => {
  const wrapper = mount(HotelCard, {
    global: {
      components: baseComponents,
    },
    props: {
      hotel: {
        id: 1,
        name: "Hotel 1",
        rating: 4,
        stars: 4,
        address: "Address 1",
        photo: "photo1",
        price: 100,
        description: "Description 1",
        reviews: [
          {
            rating: 5,
            user: {
              name: "User 1",
              location: "Location 1",
            },
            title: "Review 1",
            description: "Description 1 has what we want",
          },
          {
            user: {
              name: "User 2",
              location: "Location 2",
            },
            rating: 3,
            title: "Review 2",
            description: "Description 2 donotload",
          },
        ],
      },
    },
  });

  await wrapper.find("button").trigger("click");

  const dialog = wrapper.findComponent("[id^='radix-vue-dialog-content-']");
  const searchInput: DOMWrapper<HTMLInputElement> = dialog.find(
    "[data-testid='search-input']",
  );
  await searchInput.setValue("what we want");
  expect(searchInput.element.value).toBe("what we want");

  expect(dialog.html()).toContain("Review 1");
  expect(dialog.html()).not.toContain("Review 2");

  await searchInput.setValue("review 1");
  expect(searchInput.element.value).toBe("review 1");

  expect(dialog.html()).toContain("Review 1");
  expect(dialog.html()).not.toContain("Review 2");
});

test("reset search input by clicking clear button", async () => {
  const wrapper = mount(HotelCard, {
    global: {
      components: baseComponents,
    },
    props: {
      hotel: {
        id: 1,
        name: "Hotel 1",
        rating: 4,
        stars: 4,
        address: "Address 1",
        photo: "photo1",
        price: 100,
        description: "Description 1",
        reviews: [
          {
            rating: 5,
            user: {
              name: "User 1",
              location: "Location 1",
            },
            title: "Review 1",
            description: "Description 1 has what we want",
          },
          {
            user: {
              name: "User 2",
              location: "Location 2",
            },
            rating: 3,
            title: "Review 2",
            description: "Description 2 donotload",
          },
        ],
      },
    },
  });

  await wrapper.find("button").trigger("click");

  const dialog = wrapper.findComponent("[id^='radix-vue-dialog-content-']");
  const searchInput: DOMWrapper<HTMLInputElement> = dialog.find(
    "[data-testid='search-input']",
  );
  await searchInput.setValue("what we want");
  expect(searchInput.element.value).toBe("what we want");

  const clearBtn = dialog.find("[data-testid='clear-button']");
  await clearBtn.trigger("click");
  expect(searchInput.element.value).toBe("");
});

test("select description tab to view hotel description", async () => {
  const wrapper = mount(HotelCard, {
    global: {
      components: baseComponents,
    },
    props: {
      hotel: {
        id: 1,
        name: "Hotel 1",
        rating: 4,
        stars: 4,
        address: "Address 1",
        photo: "photo1",
        price: 100,
        description: "<p>Description 1</p>",
        reviews: [
          {
            rating: 5,
            user: {
              name: "User 1",
              location: "Location 1",
            },
            title: "Review 1",
            description: "Description 1 has what we want",
          },
        ],
      },
    },
  });

  await wrapper.find("button").trigger("click");
  const dialog = wrapper.findComponent("[id^='radix-vue-dialog-content-']");
  const descBtn = dialog.find("[data-testid='desc-btn']");
  console.log("descbtn", descBtn.html());

  await descBtn.trigger("click");
  expect(dialog.html()).toContain("Description 1");
});
