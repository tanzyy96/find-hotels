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
  // We need this tricky bit as the dialog is rendered outside the component
  const dialogContent = document.querySelector(
    "[id^='radix-vue-dialog-content-']",
  )?.innerHTML;

  expect(dialogContent).toContain("Review 1");
  expect(dialogContent).toContain("Review 2");
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
  const dialogContent = document.querySelector(
    "[id^='radix-vue-dialog-content-']",
  );
  expect(dialogContent).not.toBeNull();
  const input = dialogContent!.querySelector("input");
  expect(input).not.toBeNull();

  const dialog = wrapper.findComponent("[id^='radix-vue-dialog-content-']");
  const searchInput: DOMWrapper<HTMLInputElement> = dialog.find(
    "[data-testid='search-input']",
  );
  await searchInput.setValue("what we want");

  expect(searchInput.element.value).toBe("what we want");

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
  const dialogContent = document.querySelector(
    "[id^='radix-vue-dialog-content-']",
  );
  expect(dialogContent).not.toBeNull();
  const input = dialogContent!.querySelector("input");
  expect(input).not.toBeNull();

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
