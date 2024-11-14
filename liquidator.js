

//TODO give an identity to the bot (principal)
//is THE reward will be recieved on platform or the wallet
//TODO handle large set of users - batches, promises, parallel processesing


// MY IDEA - we will create a api , one who need to use this api will need to send there principal(act as caller) to it, we verify it from the list of liquidators or something
//then he will got all the user info who are under liq - only those whose repay amount is less then liquidator balance
//then he can just click on call liquidation with that user principal


//change liq_call logic for auto liq by platform

// PROBLEM is create actor without backend.did - athaarv
import { dfinance_backend } from "./index.js";
import express from 'express';
import cors from 'cors';
// import 'dotenv/config'; // Load environment variables from .env file

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:4943', 'http://127.0.0.1:4943/?canisterId=b77ix-eeaaa-aaaaa-qaada-cai&id=avqkn-guaaa-aaaaa-qaaea-cai'], // Allow requests from the IC replica
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400,
  preflightContinue: false,
};

app.use(cors(corsOptions));

const fetchUsers = async () => {
  try {
    const users = await dfinance_backend.get_all_users();
    console.log("Fetched Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Endpoint to fetch users
app.get('/users', async (req, res) => {
  try {
    const users = await dfinance_backend.get_all_users();
    res.json(users);
  } catch (error) {
    console.error("Error in /users endpoint:", error);
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

// Start the Express server on a new port
const PORT = 5000; // Use a different port for the API
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  fetchUsers(); // Fetch users at server startup
});


// async function triggerLiquidation(asset, collateral_asset, amount, on_behalf_of) {
//   try {
//     const result = await backendActor.liquidation_call({
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


// function calculateHealthFactor(position) {
//   const { total_collateral_value, total_borrowed_value, liquidation_threshold } = position;
//   if (total_borrowed_value === 0) {
//     return Number.MAX_SAFE_INTEGER; 
//   }
//   return (total_collateral_value * liquidation_threshold) / total_borrowed_value;
// }


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


// async function checkUserHealthFactor() {
//   try {
//     const userDataResponse = await canister.get_all_users();
//     const userData = userDataResponse.ok ? userDataResponse.ok : [];

//     for (const [principal, user] of userData) {
//       const reserves = user.reserves || [];
//       let total_collateral = 0;
//       let total_debt = 0;
//       let largestBorrowAsset = { asset: null, value: 0 };
//       let largestCollateralAsset = { asset: null, value: 0 };

      
//       for (const [asset_symbol, reserveData] of reserves) {
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

//       const healthFactor = calculateHealthFactor(position);

//       if (healthFactor < 1 && largestBorrowAsset.asset && largestCollateralAsset.asset) {
       
//         triggerLiquidation(
//           largestBorrowAsset.asset,
//           largestCollateralAsset.asset,
//           total_debt,
//           principal
//         );
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching user data from canister:', error);
//   }
// }

// // Set interval to check user health factor every minute
// setInterval(() => {
//   checkUserHealthFactor();
// }, 3600000);





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