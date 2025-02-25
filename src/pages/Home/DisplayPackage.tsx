import { PackageType } from "@/models";
import { PackageItem } from "@/models/PackageItem";
import React from "react";
import { priceTiers } from "./type";
import { formatPrice } from "@/utils/helpers";

const DisplayPackage = ({
  pkg,
  itemPackage,
}: {
  pkg: PackageType[];
  itemPackage: PackageItem[];
}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border"></th>
              {pkg.map((pack) => (
                <th key={pack.id} className="py-2 px-4 border">
                  {pack.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {priceTiers.map((tier, tierIndex) => (
              <tr key={tier.label} className="border">
                <td className="py-4 px-5 border font-bold text-indigo-600">
                  {tier.label}
                </td>
                {pkg.map((pack) => (
                  <td
                    key={pack.id}
                    className="py-2 px-4 border text-center font-semibold"
                  >
                    {pack.price.length > tierIndex
                      ? `${formatPrice(pack.price[tierIndex])} đ/m3`
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))}
            {itemPackage.map((item) => (
              <tr key={item.id} className="border">
                <td className="py-4 px-5 border font-semibold">{item.name}</td>
                {pkg.map((pack) => {
                  const foundItem = pack.items.find(
                    (pItem) => pItem.idPackageItem === item.id
                  );
                  return (
                    <td key={pack.id} className="py-2 px-4 border text-center">
                      {foundItem ? (
                        <span className="text-green-600 font-bold">
                          {foundItem.description !== ""
                            ? foundItem.description
                            : foundItem.quantity}
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold">✘</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayPackage;
