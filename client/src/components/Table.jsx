import React from "react";


const Table = () => {
  return (<>

<div class="relative overflow-x-auto">
    <h1 className="mb-2">Base Supply - 10 million coins*</h1>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                Category
                </th>
                <th scope="col" class="px-6 py-3">
                Allocation
                </th>
                <th scope="col" class="px-6 py-3">
                Percentage
                </th>
                <th scope="col" class="px-6 py-3">
                Purpose
                </th>
                <th scope="col" class="px-6 py-3">
                Mechanics
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Purchase Rewards
                </th>
                <td class="px-6 py-4">
                4 million
                </td>
                <td class="px-6 py-4">
                40%
                </td>
                <td class="px-6 py-4">
                Reward users based on purchase activity 
                </td>
                <td class="px-6 py-4">
                1 token per 50 rupees spent. Maximum of 100 tokens per purchase. 
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Referrals
                </th>
                <td class="px-6 py-4">
                1.5 million
                </td>
                <td class="px-6 py-4">
                15%
                </td>
                <td class="px-6 py-4">
                Reward users who refer others 
                </td>
                <td class="px-6 py-4">
                5 tokens per referral
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Social Media Interaction
                </th>
                <td class="px-6 py-4">
                0.5 million
                </td>
                <td class="px-6 py-4">
                5%
                </td>
                <td class="px-6 py-4">
                Reward users for sharing and engaging
                </td>
                <td class="px-6 py-4">
                5 tokens per social media post
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Staking
                </th>
                <td class="px-6 py-4">
                1.5 million
                </td>
                <td class="px-6 py-4">
                15%
                </td>
                <td class="px-6 py-4">
                Reward users for staking with a bonus
                </td>
                <td class="px-6 py-4">
                Users who stake coins receive earn upto 10% APY on their investment
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Partners/Sellers
                </th>
                <td class="px-6 py-4">
                0.5 million
                </td>
                <td class="px-6 py-4">
                5%
                </td>
                <td class="px-6 py-4">
                Reward partners and sellers   
                </td>
                <td class="px-6 py-4">
                Distributed by whitelisted admins
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Reserve 
                </th>
                <td class="px-6 py-4">
                2 million 
                </td>
                <td class="px-6 py-4">
                20%
                </td>
                <td class="px-6 py-4">
                Reserve funds for future development and emergency  
                </td>
                <td class="px-6 py-4">
                -
                </td>
            </tr>
        </tbody>
    </table>
    <h1 className="mt-2">Changes over time as circulation is dynamic*</h1>
</div>

  </>)
};

export default Table;
