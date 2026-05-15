// organize-imports-ignore
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer'
import { Button } from '../button'
import { HomeIcon, SettingsIcon, UserIcon, BellIcon, HelpCircleIcon, LogOutIcon } from 'lucide-react'

const meta: Meta<typeof Drawer> = {
  component: Drawer,
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Bottom: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex items-center justify-center p-8">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>Open Order Summary</Button>
          </DrawerTrigger>
          <DrawerContent direction="bottom">
            <DrawerHeader>
              <DrawerTitle>Order Summary</DrawerTitle>
              <DrawerDescription>Review your order before confirming.</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              {[
                { name: 'Wireless Headphones', qty: 1, price: '$89.99' },
                { name: 'USB-C Cable (3-pack)', qty: 2, price: '$24.99' },
                { name: 'Phone Stand', qty: 1, price: '$14.99' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold">{item.price}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 font-semibold">
                <span>Total</span>
                <span>$129.97</span>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button>Confirm Order</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    )
  },
}

export const Right: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const navItems = [
      { icon: HomeIcon, label: 'Dashboard' },
      { icon: UserIcon, label: 'Profile' },
      { icon: BellIcon, label: 'Notifications' },
      { icon: SettingsIcon, label: 'Settings' },
      { icon: HelpCircleIcon, label: 'Help & Support' },
    ]
    return (
      <div className="flex items-center justify-center p-8">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Right Panel</Button>
          </DrawerTrigger>
          <DrawerContent direction="right">
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerDescription>Quick access to all sections.</DrawerDescription>
            </DrawerHeader>
            <nav className="flex-1 overflow-y-auto px-4 py-2">
              <ul className="space-y-1">
                {navItems.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                      <Icon className="size-4 shrink-0" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="px-4 py-3 border-t">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                <LogOutIcon className="size-4 shrink-0" />
                Sign Out
              </button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    )
  },
}

export const Left: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex items-center justify-center p-8">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Left Drawer</Button>
          </DrawerTrigger>
          <DrawerContent direction="left">
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription>Application navigation</DrawerDescription>
            </DrawerHeader>
            <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
              <div>
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Main
                </p>
                {[HomeIcon, UserIcon, BellIcon].map((Icon, i) => {
                  const labels = ['Home', 'Account', 'Notifications']
                  return (
                    <button
                      key={labels[i]}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
                    >
                      <Icon className="size-4" />
                      {labels[i]}
                    </button>
                  )
                })}
              </div>
              <div>
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  System
                </p>
                {[SettingsIcon, HelpCircleIcon].map((Icon, i) => {
                  const labels = ['Settings', 'Help']
                  return (
                    <button
                      key={labels[i]}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
                    >
                      <Icon className="size-4" />
                      {labels[i]}
                    </button>
                  )
                })}
              </div>
            </nav>
          </DrawerContent>
        </Drawer>
      </div>
    )
  },
}

export const Default: Story = {
  render: () => {
    const [openBottom, setOpenBottom] = useState(false)
    const [openTop, setOpenTop] = useState(false)
    const [openLeft, setOpenLeft] = useState(false)
    const [openRight, setOpenRight] = useState(false)

    return (
      <div className="flex flex-wrap gap-4 items-center justify-center p-8">
        <Drawer open={openBottom} onOpenChange={setOpenBottom}>
          <DrawerTrigger asChild>
            <Button>Bottom Drawer</Button>
          </DrawerTrigger>
          <DrawerContent direction="bottom">
            <DrawerHeader>
              <DrawerTitle>Bottom Sheet</DrawerTitle>
              <DrawerDescription>Slides up from the bottom — ideal for mobile actions.</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-4 flex-1">
              <p className="text-sm text-muted-foreground">Content goes here. This is a bottom sheet pattern commonly used in mobile-first interfaces.</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
              <Button>Confirm</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Drawer open={openTop} onOpenChange={setOpenTop}>
          <DrawerTrigger asChild>
            <Button variant="outline">Top Drawer</Button>
          </DrawerTrigger>
          <DrawerContent direction="top">
            <DrawerHeader>
              <DrawerTitle>Top Notification Panel</DrawerTitle>
              <DrawerDescription>Slides down from the top — great for alerts and banners.</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-4 flex-1">
              <p className="text-sm text-muted-foreground">Use top drawers for system notifications, search bars, or filter panels.</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Dismiss</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Drawer open={openLeft} onOpenChange={setOpenLeft}>
          <DrawerTrigger asChild>
            <Button variant="outline">Left Drawer</Button>
          </DrawerTrigger>
          <DrawerContent direction="left">
            <DrawerHeader>
              <DrawerTitle>Left Navigation</DrawerTitle>
              <DrawerDescription>Slides from the left — classic sidebar pattern.</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 px-4 py-4">
              <p className="text-sm text-muted-foreground">Left drawers are great for navigation menus and sidebar content.</p>
            </div>
          </DrawerContent>
        </Drawer>

        <Drawer open={openRight} onOpenChange={setOpenRight}>
          <DrawerTrigger asChild>
            <Button variant="secondary">Right Drawer</Button>
          </DrawerTrigger>
          <DrawerContent direction="right">
            <DrawerHeader>
              <DrawerTitle>Right Panel</DrawerTitle>
              <DrawerDescription>Slides from the right — often used for detail views.</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 px-4 py-4">
              <p className="text-sm text-muted-foreground">Right panels work well for settings, filters, and contextual detail views.</p>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    )
  },
}
