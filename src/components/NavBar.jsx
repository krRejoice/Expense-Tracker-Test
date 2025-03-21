import React from "react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Add Expenses", href: "/expense-form", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navbar = () => {
  return (
    <div className="min-h-full">
      <div as="nav" className="bg-gray-800 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <img alt="Your Company" src="./budget.png" className="size-8" />
              </div>
              <div>
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"></div>
      </main>
    </div>
  );
};

export default navbar;
