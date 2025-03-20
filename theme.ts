"use client";

import { CheckIcon, createTheme, DEFAULT_THEME, ScrollArea } from "@mantine/core";

export const primaryBorder = "#282828";
export const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  headings: {
    fontFamily: "Poppins, sans-serif",
  },
  colors: {
    primary: [
      "#8AE2E7",
      "#72DDE3",
      "#5BD7DE",
      "#43D2DA",
      "#2CCCD5",
      "#15c7d1",
      "#12B3BC",
      "#109FA7",
      "#0E8B92",
      "#0C777D",
    ],
    success: [
      "#051802",
      "#0A2F04",
      "#0E4706",
      "#135E08",
      "#1D8E0B",
      "#26BD0F",
      "#2CD111",
      "#30EC13",
      "#59F042",
      "#83F471",
    ],
    secondary_teal: [
      "#132020",
      "#182929",
      "#264040",
      "#2f5050",
      "#396060",
      "#427070",
      "#4b8181",
      "#5ea1a1",
      "#6eaaaa",
      "#8fbdbd",
    ],
  },
  primaryColor: "primary",
  primaryShade: 5,
  components: {
    Button: {
      defaultProps: {
        size: "sm",
        radius: "sm",
        fz: "md",
        fw: "normal",
      },
      styles: (style: any, params: any) => ({
        root: {
          ...(!params.variant && {
            color: params.c || style.colors.dark[9],
          }),
          ...(params.disabled && {
            opacity: 0.3,
            background: style.colors.primary[5],
          }),
          fontSize: style.fontSizes.sm,
          width: params.w ?? "fit-content",
          minWidth: params.w ?? "fit-content",
        },
      }),
    },
    ActionIcon: {
      defaultProps: {
        size: "md",
        radius: "xl",
        p: "2px",
        bd: "0.6px solid primary.4",
        color: "dark.9",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        shadow: "sm",
        padding: "lg",
        withBorder: true,
        bd: `1px solid ${primaryBorder}`,
        bg: "black",
        w: "100%",
        pos: "relative",
        style: { cursor: "default", overflow: "hidden" },
      },
    },
    ThemeIcon: {
      defaultProps: {
        size: "md",
        color: "dark.9",
        p: "6px",
        bd: "0.6px solid primary.4",
      },
    },
    Badge: {
      defaultProps: {
        size: "md",
        radius: "md",
        variant: "outline",
        tt: "none",
        fw: "normal",
      },
    },
    Flex: {
      defaultProps: {
        justify: "space-between",
        align: "center",
      },
    },
    Container: {
      defaultProps: {
        p: "md",
        bg: "black",
        fluid: true,
        h: "100%",
        mih: "100%",
        style: { cursor: "default" },
      },
    },
    Select: {
      defaultProps: {
        h: "64px",
        radius: "md",
        styles: {
          input: {
            backgroundColor: "black",
            border: "none",
            height: "64px",
          },
          dropdown: {
            backgroundColor: "black",
            border: "none",
          },
        },
      },
    },
    InputBase: {
      defaultProps: {
        radius: "md",
        styles: {
          input: {
            backgroundColor: "black",
            border: "1px solid dark.4",
            height: "sm",
            width: "100%",
          },
        },
      },
    },
    Group: {
      defaultProps: {
        gap: "md",
        wrap: "nowrap",
        align: "center",
      },
    },
    Avatar: {
      defaultProps: {
        radius: "8px",
        size: "20px",
      },
    },
    Combobox: {
      styles: {
        dropdown: {
          border: "none",
          backgroundColor: "black",
        },
      },
    },
    Menu: {
      defaultProps: {
        style: { cursor: "pointer" },
        withArrow: true,
        position: "bottom-end",
        width: 262,
      },
      styles: {
        item: {
          borderRadius: 0,
          height: "40px",
        },
        dropdown: {
          border: "none",
          cursor: "default",
          backgroundColor: "dark.6",
        },
      },
    },
    Stack: {
      defaultProps: {
        gap: "sm",
        w: "100%",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
        size: "sm",
        w: "100%",
        styles: (styles: any, params: any) => ({
          root: {
            width: params.w ?? "100%",
          },
          wrapper: {
            width: "100%",
          },
          input: {
            height: params.h ?? "sm",
            width: params.w ?? "100%",
            border: "1px solid dark.4",
            backgroundColor: "black",
          },
        }),
      },
    },
    NumberInput: {
      defaultProps: {
        radius: "md",
        size: "sm",
        w: "100%",
        styles: (styles: any, params: any) => ({
          root: {
            width: params.w ?? "100%",
          },
          wrapper: {
            width: "100%",
          },
          input: {
            height: params.h ?? "sm",
            width: params.w ?? "100%",
            border: "1px solid dark.4",
            backgroundColor: "black",
          },
        }),
      },
    },
    MultiSelect: {
      defaultProps: {
        radius: "md",
        size: "sm",
        w: "100%",
        styles: (styles: any, params: any) => ({
          root: {
            width: params.w ?? "100%",
          },
          wrapper: {
            width: "100%",
          },
          input: {
            height: params.h ?? "sm",
            width: params.w ?? "100%",
            border: "1px solid dark.4",
            backgroundColor: "black",
          },
        }),
      },
    },
    TextArea: {
      defaultProps: {
        radius: "md",
        w: "100%",
      },
      styles: (styles: any, params: any) => ({
        input: {
          height: params.h ?? "80px",
          width: params.w ?? "100%",
          border: params.bd ?? "1px solid dark.4",
          backgroundColor: "black",
          ...params?.styles?.input,
        },
      }),
    },
    Text: {
      defaultProps: {
        c: "white",
      },
    },
    Title: {
      defaultProps: {
        c: "white",
      },
    },
    LoadingOverlay: {
      defaultProps: {
        overlayProps: {
          radius: "sm",
          blur: "1",
        },
        loaderProps: {
          type: "bars",
          color: "primary.4",
        },
      },
    },
    Loader: {
      defaultProps: {
        size: "sm",
        type: "dots",
        color: "rgb(20,20,20)",
      },
    },
    Tabs: {
      defaultProps: {
        radius: "sm",
      },
    },
    TabsList: {
      defaultProps: {
        style: {
          "--tabs-list-line-end": "none",
        },
      },
    },
    TabsTab: {
      defaultProps: {
        py: "sm",
        px: "md",
        fw: 600,
      },
    },
    TabsPanel: {
      defaultProps: {
        pt: "lg",
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: "md",
        rightSectionWidth: "auto",
      },
    },
    Modal: {
      defaultProps: {
        centered: true,
      },
      styles: (style: any, params: any) => ({
        content: {
          backgroundColor: params.bg ?? style.colors.dark[9],
          minHeight: "362px",
          radius: "md",
          overflow: "hidden",
        },
        header: {
          backgroundColor: params.bg ?? style.colors.dark[9],
        },
        body: {
          paddingTop: params.pt ?? style.spacing.md,
        },
      }),
    },
    Drawer: {
      defaultProps: {
        position: "right",
        scrollAreaComponent: ScrollArea.Autosize,
        size: "xl",
        transitionProps: {
          duration: 200,
          timingFunction: "ease",
        },
      },
      styles: (style: any, params: any) => ({
        content: {
          backgroundColor: params.bg ?? style.colors.dark[9],
          overflow: "hidden",
        },
        header: {
          backgroundColor: params.bg ?? style.colors.dark[9],
        },
        body: {
          paddingTop: params.pt ?? style.spacing.md,
        },
      }),
    },
    Table: {
      defaultProps: {
        withColumnBorders: false,
        highlightOnHover: true,
        striped: false,
        borderColor: "dark.6",
      },
      styles: (style: any, params: any) => ({
        th: {
          color: style.colors.dark[3],
        },
        tr: {
          "--table-highlight-on-hover-color": style.colors.dark[6],
        },
      }),
    },
    Anchor: {
      defaultProps: {
        size: "sm",
      },
    },
    Progress: {
      defaultProps: {
        size: "lg",
        transitionDuration: 200,
        color: "primary.4",
        bg: "black",
      },
    },
    Alert: {
      defaultProps: {
        autoContrast: true,
      },
    },
    List: {
      defaultProps: {
        size: "xs",
        spacing: "sm",
      },
      styles: (style: any, params: any) => ({
        root: {
          width: params.w ?? "100%",
        },
        itemWrapper: {
          width: "inherit",
          "--li-align": params?.style?.["--li-align"] ?? "top",
        },
        item: {
          width: "inherit",
        },
        itemLabel: {
          width: "inherit",
        },
      }),
    },
    Tooltip: {
      defaultProps: {
        withArrow: true,
        color: "dark.9",
        arrowSize: 4,
        arrowOffset: 10,
        multiline: true,
        maw: 300,
      },
    },
    SegmentedControl: {
      defaultProps: {
        bg: "black",
      },
    },
    Center: {
      defaultProps: {
        style: {
          gap: 10,
        },
      },
    },
    Slider: {
      defaultProps: {
        size: "sm",
        step: 0.1,
        min: 0,
        max: 1,
        thumbSize: 16,
        style: {
          "--slider-track-bg": DEFAULT_THEME.colors.dark[6],
        },
      },
    },
    Dropzone: {
      defaultProps: {
        // color: "black",
        mih: 260,
      },
      styles: (style: any, params: any) => ({
        root: {
          backgroundColor: params.color ?? "black",
          width: params.w ?? "100%",
          height: params.h ?? params.mih ?? "100%",
        },
        inner: {
          width: "100%",
          height: "100%",
        },
      }),
    },
    Radio: {
      defaultProps: {
        size: "sm",
        color: "green.6",
        iconColor: "black",
        icon: CheckIcon,
      },
    },
    NavLink: {
      styles: (style: any, params: any) => ({
        root: {
          borderRadius: "5px",
        },
      }),
    },
    Divider: {
      defaultProps: {
        color: primaryBorder,
      },
    },
  },
  fontSizes: {
    sm: "14px",
    md: "16px",
    lg: "18px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  defaultRadius: "sm",
  radius: DEFAULT_THEME.radius,
  cursorType: "pointer",
});
