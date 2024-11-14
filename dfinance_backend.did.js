export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  const UserState = IDL.Record({
    'adjusted_balance' : IDL.Nat,
    'last_liquidity_index' : IDL.Nat,
  });
  const UserReserveData = IDL.Record({
    'supply_rate' : IDL.Nat,
    'asset_price_when_supplied' : IDL.Nat,
    'principal_stable_debt' : IDL.Nat64,
    'asset_borrow' : IDL.Nat,
    'last_update_timestamp' : IDL.Nat64,
    'is_collateral' : IDL.Bool,
    'asset_price_when_borrowed' : IDL.Nat,
    'liquidity_index' : IDL.Nat,
    'variable_borrow_index' : IDL.Nat,
    'reserve' : IDL.Text,
    'asset_supply' : IDL.Nat,
    'state' : UserState,
    'borrow_rate' : IDL.Nat,
    'is_using_as_collateral_or_borrow' : IDL.Bool,
    'is_borrowed' : IDL.Bool,
  });
  const UserData = IDL.Record({
    'ltv' : IDL.Opt(IDL.Nat),
    'available_borrow' : IDL.Opt(IDL.Nat),
    'net_apy' : IDL.Opt(IDL.Nat),
    'reserves' : IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, UserReserveData))),
    'health_factor' : IDL.Opt(IDL.Nat),
    'total_collateral' : IDL.Opt(IDL.Nat),
    'total_debt' : IDL.Opt(IDL.Nat),
    'user_id' : IDL.Opt(IDL.Text),
    'liquidation_threshold' : IDL.Opt(IDL.Nat),
    'max_ltv' : IDL.Opt(IDL.Nat),
    'net_worth' : IDL.Opt(IDL.Nat),
  });
  const Result_3 = IDL.Variant({ 'Ok' : IDL.Principal, 'Err' : IDL.Text });
  const CachedPrice = IDL.Record({ 'price' : IDL.Nat });
  const PriceCache = IDL.Record({
    'cache' : IDL.Vec(IDL.Tuple(IDL.Text, CachedPrice)),
  });
  const Result_4 = IDL.Variant({ 'Ok' : PriceCache, 'Err' : IDL.Text });
  const Result_5 = IDL.Variant({
    'Ok' : IDL.Tuple(IDL.Nat, IDL.Nat64),
    'Err' : IDL.Text,
  });
  const ReserveConfiguration = IDL.Record({
    'ltv' : IDL.Nat,
    'liquidation_protocol_fee' : IDL.Nat,
    'active' : IDL.Bool,
    'supply_cap' : IDL.Nat,
    'borrow_cap' : IDL.Nat,
    'reserve_factor' : IDL.Nat,
    'borrowing_enabled' : IDL.Bool,
    'frozen' : IDL.Bool,
    'liquidation_bonus' : IDL.Nat,
    'liquidation_threshold' : IDL.Nat,
    'paused' : IDL.Bool,
  });
  const ReserveData = IDL.Record({
    'id' : IDL.Nat16,
    'asset_name' : IDL.Opt(IDL.Text),
    'userlist' : IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, IDL.Bool))),
    'can_be_collateral' : IDL.Opt(IDL.Bool),
    'debt_token_canister' : IDL.Opt(IDL.Text),
    'last_update_timestamp' : IDL.Nat64,
    'liquidity_index' : IDL.Nat,
    'd_token_canister' : IDL.Opt(IDL.Text),
    'current_liquidity_rate' : IDL.Nat,
    'borrow_rate' : IDL.Nat,
    'supply_rate_apr' : IDL.Opt(IDL.Nat),
    'configuration' : ReserveConfiguration,
    'debt_index' : IDL.Nat,
    'total_borrowed' : IDL.Nat,
    'total_supply' : IDL.Nat,
  });
  const Result_6 = IDL.Variant({ 'Ok' : ReserveData, 'Err' : IDL.Text });
  const Result_7 = IDL.Variant({ 'Ok' : UserData, 'Err' : IDL.Text });
  return IDL.Service({
    'borrow' : IDL.Func([IDL.Text, IDL.Nat64], [Result], []),
    'check_user' : IDL.Func([IDL.Text], [Result_1], []),
    'create_multiple_canisters' : IDL.Func([], [IDL.Vec(IDL.Principal)], []),
    'faucet' : IDL.Func([IDL.Text, IDL.Nat64], [Result_2], []),
    'get_all_assets' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'get_all_users' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, UserData))],
        ['query'],
      ),
    'get_asset_principal' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'get_balance' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'get_cached_exchange_rate' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'get_exchange_rates' : IDL.Func(
        [IDL.Text, IDL.Opt(IDL.Text), IDL.Nat],
        [Result_5],
        [],
      ),
    'get_reserve_data' : IDL.Func([IDL.Text], [Result_6], ['query']),
    'get_user_data' : IDL.Func([IDL.Text], [Result_7], ['query']),
    'initialize_reserve' : IDL.Func([], [], []),
    'login' : IDL.Func([], [Result], []),
    'queary_reserve_price' : IDL.Func([], [IDL.Vec(PriceCache)], ['query']),
    'repay' : IDL.Func([IDL.Text, IDL.Nat, IDL.Opt(IDL.Text)], [Result], []),
    'supply' : IDL.Func([IDL.Text, IDL.Nat64, IDL.Bool], [Result], []),
    'toggle_collateral' : IDL.Func([IDL.Text, IDL.Nat, IDL.Nat], [], []),
    'transfer' : IDL.Func([IDL.Nat, IDL.Text], [Result_2], []),
    'update_balance' : IDL.Func([IDL.Principal, IDL.Principal], [IDL.Nat], []),
    'update_reserves_price' : IDL.Func([], [], []),
    'withdraw' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Opt(IDL.Text), IDL.Bool],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
