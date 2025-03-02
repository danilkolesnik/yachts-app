'use client'
import React from 'react';
import {
  Navbar,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  ArchiveBoxIcon,
  LockClosedIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import Link from 'next/link'

function NavList() {

  const clearLocalStorage = () => {
    localStorage.clear();
  }

  return (
    <List className="flex flex-row p-0">
      <Typography
          variant="small"
          color="black"
          className="font-medium"
      >
            <Link href="/orders">
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                  <ArchiveBoxIcon className="h-5 w-5 mr-2" />
                  Orders
              </ListItem>
          </Link>
      </Typography>
      <Typography
        variant="small"
        color="black"
        className="font-medium"
      >
        <Link href="/offers">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Offers
          </ListItem>
        </Link>
      </Typography>
      <Typography
        variant="small"
        color="black"
        className="font-medium"
      >
        <Link href="/warehouse">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <ArchiveBoxIcon className="h-5 w-5 mr-2" />
            Warehouse
          </ListItem>
          </Link>
      </Typography>
      <Typography
        variant="small"
        color="black"
        className="font-medium"
      >
        <Link href="/priceList">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <CurrencyDollarIcon className="h-5 w-5 mr-2" />
            Price List
          </ListItem>
        </Link>
      </Typography>
      <Typography
        variant="small"
        color="black"
        className="font-medium"
      >
        <Link href="/users">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <UserIcon className="h-5 w-5 mr-2" />
            Users
          </ListItem>
        </Link>
      </Typography>
      <Typography
        variant="small"
        color="black"
        className="font-medium"
      >
        <Link href="/auth/login" onClick={clearLocalStorage}>
          <ListItem className="flex items-center gap-2 py-2 pr-4">
           <LockClosedIcon className="h-5 w-5 mr-2" />
            Auth
          </ListItem>
        </Link>
      </Typography>
    </List>
  );
}

const Header = () => {
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 rounded-none bg-white">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex-grow"></div>
        <NavList />
      </div>
    </Navbar>
  );
};

export default Header;