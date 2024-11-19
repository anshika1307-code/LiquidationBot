

//TODO give an identity to the bot (principal)
//is THE reward will be recieved on platform or the wallet
//TODO handle large set of users - batches, promises, parallel processesing


// MY IDEA - we will create a api , one who need to use this api will need to send there principal(act as caller) to it, we verify it from the list of liquidators or something
//then he will got all the user info who are under liq - only those whose repay amount is less then liquidator balance
//then he can just click on call liquidation with that user principal


//change liq_call logic for auto liq by platform

// PROBLEM is create actor without backend.did - athaarv
// import { dfinance_backend } from "./index.js";

// // Log all assets
// console.log("Fetching all assets...");
// const allAssets = await dfinance_backend.get_all_assets();
// console.log("All assets response:", JSON.stringify(allAssets));

// // Trigger liquidation
// async function triggerLiquidation(asset, collateral_asset, amount, on_behalf_of) {
//   console.log("Triggering liquidation with parameters:", {
//     asset,
//     collateral_asset,
//     amount,
//     on_behalf_of,
//   });
//   try {
//     const result = await dfinance_backend.liquidation_call({
//       asset,
//       collateral_asset,
//       amount,
//       on_behalf_of,
//     });
//     console.log("Liquidation call result:", JSON.stringify(result));

//     if (result.ok) {
//       console.log("Liquidation successful");
//     } else {
//       console.error("Error triggering liquidation:", JSON.stringify(result.err));
//     }
//   } catch (error) {
//     console.error("Failed to call liquidation:", error);
//   }
// }

// Calculate health factor
function calculateHealthFactor(position) {
  console.log("Calculating health factor for position:", JSON.stringify(position));
  const { total_collateral_value, total_borrowed_value, liquidation_threshold } = position;
  if (total_borrowed_value === 0) {
    return Number.MAX_SAFE_INTEGER;
  }
  const healthFactor = (total_collateral_value * liquidation_threshold) / total_borrowed_value;
  console.log("Health factor calculated:", healthFactor);
  return healthFactor;
}

// // Get exchange rate
// async function getExchangeRate(asset_symbol) {
//   console.log(`Fetching exchange rate for ${asset_symbol}...`);
//   try {
//     const result = await dfinance_backend.get_exchange_rates(asset_symbol, "USD", 1);
//     console.log(`Exchange rate response for ${asset_symbol}:`, JSON.stringify(result));

//     if (result.ok) {
//       const [price, timestamp] = result.ok;
//       console.log(`Price for ${asset_symbol}:`, price, "Timestamp:", timestamp);
//       return price;
//     } else {
//       console.error(`Error fetching price for ${asset_symbol}:`, JSON.stringify(result.err));
//       return null;
//     }
//   } catch (error) {
//     console.error(`Failed to get exchange rate for ${asset_symbol}:`, error);
//     return null;
//   }
// }

// // Check user health factor
// async function checkUserHealthFactor() {
//   console.log("Checking user health factors...");
//   try {
//     const userDataResponse = await dfinance_backend.get_all_users();
//     console.log("User data response:", JSON.stringify(userDataResponse));

//     const userData = userDataResponse.ok ? userDataResponse.ok : [];
//     for (const [principal, user] of userData) {
//       console.log("Processing user:", principal, JSON.stringify(user));
//       const reserves = user.reserves || [];
//       let total_collateral = 0;
//       let total_debt = 0;
//       let largestBorrowAsset = { asset: null, value: 0 };
//       let largestCollateralAsset = { asset: null, value: 0 };

//       for (const [asset_symbol, reserveData] of reserves) {
//         console.log(`Processing reserve for asset ${asset_symbol}:`, JSON.stringify(reserveData));
//         const { asset_supply, asset_borrow, is_collateral } = reserveData;

//         const assetSupplyPrice = await getExchangeRate(asset_symbol);
//         const assetBorrowPrice = await getExchangeRate(asset_symbol);

//         if (assetSupplyPrice !== null && is_collateral) {
//           const collateralValue = asset_supply * assetSupplyPrice;
//           total_collateral += collateralValue;

//           if (collateralValue > largestCollateralAsset.value) {
//             largestCollateralAsset = { asset: asset_symbol, value: collateralValue };
//           }
//         }

//         if (assetBorrowPrice !== null) {
//           const debtValue = asset_borrow * assetBorrowPrice;
//           total_debt += debtValue;

//           if (debtValue > largestBorrowAsset.value) {
//             largestBorrowAsset = { asset: asset_symbol, value: debtValue };
//           }
//         }
//       }

//       const position = {
//         total_collateral_value: total_collateral,
//         total_borrowed_value: total_debt,
//         liquidation_threshold: user.liquidation_threshold || 0,
//       };

//       console.log("User position:", JSON.stringify(position));
//       const healthFactor = calculateHealthFactor(position);

//       if (healthFactor < 1 && largestBorrowAsset.asset && largestCollateralAsset.asset) {
//         console.log(
//           "User health factor below 1. Triggering liquidation for:",
//           principal,
//           JSON.stringify(largestBorrowAsset),
//           JSON.stringify(largestCollateralAsset)
//         );
//         await triggerLiquidation(
//           largestBorrowAsset.asset,
//           largestCollateralAsset.asset,
//           total_debt,
//           principal
//         );
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching user data from canister:", error);
//   }
// }

// // Set interval to check user health factor every minute
// setInterval(() => {
//   console.log("Health factor check triggered.");
//   checkUserHealthFactor();
// }, 3600000);








// import { dfinance_backend } from "./index.js";

// async function fetchAndPrintAllAssets() {
//   console.log("Fetching all assets...");
//   try {
//     const allAssets = await dfinance_backend.get_all_assets();
//     console.log("All assets response:", JSON.stringify(allAssets));

//     // Start the rest of the application after printing all assets
//     startApplication();
//   } catch (error) {
//     console.error("Error fetching all assets:", error);
//   }
// }

// async function startApplication() {
//   // Trigger liquidation example
//   console.log("Starting the rest of the application...");
//   await checkUserHealthFactor();
//   setInterval(() => {
//     console.log("Health factor check triggered.");
//     checkUserHealthFactor();
//   }, 3600000);
// }
// // Custom replacer to handle BigInt serialization
// function stringifyWithBigInt(obj) {
//   return JSON.stringify(obj, (key, value) =>
//     typeof value === "bigint" ? value.toString() : value,
//     2 // Add indentation for readability
//   );
// }

// async function checkUserHealthFactor() {
//   try {
//     const userDataResponse = await dfinance_backend.get_all_users();
//     console.log("User data response (formatted):");
//     console.log(stringifyWithBigInt(userDataResponse));

//     // Adjust userData extraction to handle array-wrapped responses
//     const userData = Array.isArray(userDataResponse) && userDataResponse.length > 0 
//       ? userDataResponse[0] 
//       : [];
//     console.log("User data extracted:", stringifyWithBigInt(userData));

//     if (!Array.isArray(userData)) {
//       console.error("Error: userData is not an array or empty. Actual value:", stringifyWithBigInt(userData));
//       return;
//     }

//     // Iterate over the userData
//     for (const entry of userData) {
//       if (!Array.isArray(entry) || entry.length !== 2) {
//         console.error("Unexpected entry format in userData:", stringifyWithBigInt(entry));
//         continue;
//       }

//       const [principal, user] = entry;
//       console.log("Processing user principal:", principal);
//       console.log("User details:", stringifyWithBigInt(user));

//       const reserves = user.reserves || [];
//       for (const [asset_symbol, reserveData] of reserves) {
//         console.log(`Processing reserve for asset ${asset_symbol}:`, stringifyWithBigInt(reserveData));
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching user data from canister:", error);
//   }
// }




// // async function checkUserHealthFactor() {
// //   try {
// //     const userDataResponse = await dfinance_backend.get_all_users();
// //     console.log("User data response:", JSON.stringify(userDataResponse));

// //     // Additional processing here...
// //   } catch (error) {
// //     console.error("Error fetching user data from canister:", error);
// //   }
// // }

// // Initial fetch and print
// fetchAndPrintAllAssets();



// const { Principal } = require('@dfinity/principal');
// const { Actor, HttpAgent } = require('@dfinity/agent');

// const canisterId = 'v6dul-ayaaa-aaaam-adosq-cai';
// const agent = new HttpAgent({
//   host: 'https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=v6dul-ayaaa-aaaam-adosq-cai',
// });
// const canister = Actor.createActor(canisterId, { agent });

// // Function to call the backend canister liquidation_call
// async function triggerLiquidation(asset, collateral_asset, amount, on_behalf_of) {
//   try {
//     const result = await canister.liquidation_call({
//       asset,
//       collateral_asset,
//       amount,
//       on_behalf_of,
//     });

//     if (result.ok) {
//       console.log('Liquidation successful');
//     } else {
//       console.error('Error triggering liquidation:', result.err);
//     }
//   } catch (error) {
//     console.error('Failed to call liquidation:', error);
//   }
// }

// // Function to calculate health factor
// function calculateHealthFactor(position) {
//   const { total_collateral_value, total_borrowed_value, liquidation_threshold } = position;
//   if (total_borrowed_value === 0) {
//     return Number.MAX_SAFE_INTEGER; // Max health factor when there is no debt
//   }
//   return (total_collateral_value * liquidation_threshold) / total_borrowed_value;
// }

// // Function to get the price of an asset in USD
// async function getExchangeRate(asset_symbol) {
//   try {
//     const result = await canister.get_exchange_rates(asset_symbol, 'USD', 1);
//     if (result.ok) {
//       const [price, timestamp] = result.ok;
//       return price;
//     } else {
//       console.error(`Error fetching price for ${asset_symbol}:`, result.err);
//       return null;
//     }
//   } catch (error) {
//     console.error(`Failed to get exchange rate for ${asset_symbol}:`, error);
//     return null;
//   }
// }

// // Function to check user health factor and trigger liquidation if necessary
// async function checkUserHealthFactor() {
//   try {
//     const userDataResponse = await canister.get_all_users();
//     const userData = userDataResponse.ok ? userDataResponse.ok : [];

//     for (const [principal, user] of userData) {
//       const reserves = user.reserves || [];
//       let total_collateral = 0;
//       let total_debt = 0;

//       // Calculate total collateral and debt in USD
//       for (const [asset_symbol, reserveData] of reserves) {
//         const { asset_supply, asset_borrow, is_collateral } = reserveData;

//         // Fetch USD price for each asset
//         const assetSupplyPrice = await getExchangeRate(asset_symbol);
//         const assetBorrowPrice = await getExchangeRate(asset_symbol);

//         if (assetSupplyPrice !== null && is_collateral) {
//           total_collateral += asset_supply * assetSupplyPrice; // Convert supply to USD
//         }
//         if (assetBorrowPrice !== null) {
//           total_debt += asset_borrow * assetBorrowPrice; // Convert borrow to USD
//         }
//       }

//       const position = {
//         total_collateral_value: total_collateral,
//         total_borrowed_value: total_debt,
//         liquidation_threshold: user.liquidation_threshold || 0,
//       };

//       const healthFactor = calculateHealthFactor(position);

//       if (healthFactor < 1) {
//         // Trigger liquidation if health factor is less than 1
//         const asset = reserves[0] ? reserves[0][0] : ""; // Using the first asset for demonstration
//         triggerLiquidation(asset, asset, total_debt, principal);
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching user data from canister:', error);
//   }
// }

// // Set interval to check user health factor every minute
// setInterval(() => {
//   checkUserHealthFactor();
// }, 60000);



import { dfinance_backend } from "./index.js";

const cache = {}; // To store asset prices and track changes
const POLLING_INTERVAL = 10 * 60 * 1000; // 10 minutes

// Fetch exchange rate for an asset
async function fetchExchangeRate(baseAsset) {
  try {
    const result = await dfinance_backend.get_exchange_rates(baseAsset, [], 100000000);
    // console.log(result);
    if (result && result.Ok) {
      const [price, timestamp] = result.Ok;
      console.log(`Exchange rate fetched successfully for ${baseAsset}:`, price, timestamp);

      // Return the price
      return price;
    } else {
      console.error(`Error fetching price for ${baseAsset}:`, result.Err || "Unknown error");
      return null;
    }
  } catch (error) {
    console.error(`Failed to fetch exchange rate for ${baseAsset}:`, error);
    return null;
  }

}

// Update cache and trigger actions for changed prices
async function updateCacheAndTriggerActions(assets) {
  for (const asset of assets) {
    const newPrice = await fetchExchangeRate(asset);

    if (newPrice !== null) {
      if (!cache[asset] || cache[asset] !== newPrice) {
        console.log(`Price change detected for ${asset}: Old: ${cache[asset]}, New: ${newPrice}`);
        cache[asset] = newPrice;

        // Fetch users using this asset as collateral or debt
        await fetchUsersByAsset(asset);
      }
    }
  }
}

// Fetch users by asset
async function fetchUsersByAsset(asset) {
  try {
    const allUsers = await dfinance_backend.get_all_users();
    // console.log("all users", allUsers);
    const usersWithAsset = allUsers.filter(([principal, userData]) => {
      if (userData.reserves && Array.isArray(userData.reserves)) {
        const reserves = userData.reserves || [];
        // console.log("usereserve", reserves);

        // Adjust this line to handle the nested array structure
        const hasAsset = reserves.some(reserve => reserve[0][0] === asset);
        console.log(`User ${principal} has asset ${asset}:`, hasAsset);

        return hasAsset;
      }
      return false;
    });


    usersWithAsset.forEach(async ([principal, userData]) => {
      // console.log("Principal:", principal);
      // console.log("UserData:", JSON.stringify(userData, null, 2));
      //loop all reserves -> call get normalizedincome and getnormalizeddebt multiply it with assetprice from cache 
      //add it up to totalcollateral and totaldebt 
      //pass it to h.f formula
      console.log(`Users using ${asset} as collateral or debt:`, principal);

      const reserves = userData.reserves || [];
      let totalCollateral = 0;
      let totalDebt = 0;
      //max debt asset, max collateral asset
      for (const reserve of reserves) {
        const [reserveAsset] = reserve[0];
        // console.log('reservename', [reserveAsset]);
        const userreserveData = reserve[0][1];
        // console.log('user reserve data', userreserveData);
        const normalizedIncome = await dfinance_backend.user_normalized_supply(reserve[0][1]);
        const normalizedDebt = await dfinance_backend.user_normalized_debt(reserve[0][1]);

        const assetPrice = cache[reserveAsset] || 0; // Use cached price
        console.log(`Normalized Income for ${reserveAsset}:`, normalizedIncome.Ok);
        console.log(`Normalized Debt for ${reserveAsset}:`, normalizedDebt.Ok);
        console.log(`Asset price for ${reserveAsset}:`, assetPrice);

        // Calculate collateral and debt contributions
        totalSupply  += BigInt(normalizedIncome.Ok) * BigInt(assetPrice);
        //if userreserve.iscollateral { totalCollateral}
        totalCollateral += BigInt(normalizedIncome.Ok) * BigInt(assetPrice);
totalDebt += BigInt(normalizedDebt.Ok) * BigInt(assetPrice);
      }

      console.log(`User ${principal} Total Collateral: ${totalCollateral}, Total Debt: ${totalDebt}`);

      // Calculate health factor (h.f)
      const healthFactor = totalDebt === 0 ? Infinity : totalCollateral / totalDebt; //change this according to formula
      console.log(`User ${principal} Health Factor (h.f): ${healthFactor}`);

      if (healthFactor < 1) {
        console.log(`User ${principal} is at risk of liquidation!`);
        // Add logic to handle liquidation if necessary
        //call liq_call function from backend
      }





    });
  } catch (error) {
    console.error(`Error fetching users by asset ${asset}:`, error);
  }
}

// Main function to start the interval
async function startPriceMonitoring(assets) {
  console.log("Starting price monitoring...");

  // Initial fetch to populate the cache
  await updateCacheAndTriggerActions(assets);

  // Set interval to monitor price changes
  setInterval(async () => {
    console.log("Checking for price updates...");
    await updateCacheAndTriggerActions(assets);
  }, POLLING_INTERVAL);
}

// List of assets to monitor
const assets = ["ICP", "ckBTC", "ckETH", "ckUSDC", "ckUSDT"];

// Start the monitoring process
startPriceMonitoring(assets);


function calculateHealthFactor(position) {
  const { total_collateral_value, total_borrowed_value, liquidation_threshold } = position;
  if (total_borrowed_value === 0) {
    return Number.MAX_SAFE_INTEGER; // Max health factor when there is no debt
  }
  return (total_collateral_value * liquidation_threshold) / total_borrowed_value;
}

//getuserstate
//exchange rate outside the getUserAccountData, cal it using
//recalculate total collateral in base currency and total debt -> getUserAccountData

//cal. health factor - 