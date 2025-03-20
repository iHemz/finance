"use client";

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  Burger,
  Container,
  Group,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const AppShellLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 72 }}
      navbar={{ width: 320, breakpoint: "sm", collapsed: { mobile: !opened } }}
      styles={{
        header: { borderColor: "#1F2937" },
        navbar: { borderColor: "#1F2937" },
      }}
    >
      <AppShellHeader>
        <Group h="100%" justify="center" bg="black" p="sm">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title>Causal-Style Formula Input</Title>
        </Group>
      </AppShellHeader>
      <AppShellNavbar p="md" bg="dark.8">
        <AppShellSection>
          <Title>Lucid Dreams</Title>
        </AppShellSection>
      </AppShellNavbar>
      <AppShellMain mih="calc(100vh - 72px)">
        <Container mih="calc(100vh - 72px)">{children}</Container>
      </AppShellMain>
    </AppShell>
  );
};

export default AppShellLayout;
