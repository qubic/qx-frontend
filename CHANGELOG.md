## [1.2.2](https://github.com/qubic/qx-frontend/compare/v1.2.1...v1.2.2) (2025-03-27)


### Bug Fixes

* add 'approve in wallet' translation for multiple languages ([0827190](https://github.com/qubic/qx-frontend/commit/0827190476233fa70b4677c871d8afa3cdd2a9f5))
* update footer links to use correct URLs ([4d09bdb](https://github.com/qubic/qx-frontend/commit/4d09bdb0dd9006450748f4c78a43c5a307d3df7b))

## [1.2.1](https://github.com/qubic/qx-frontend/compare/v1.2.0...v1.2.1) (2025-03-18)


### Bug Fixes

* remove pipe for VITE_APP_URL assignment in deploy workflow ([d4456b2](https://github.com/qubic/qx-frontend/commit/d4456b2c50053f311d080ea2ec0fb01d6d5bba99))

# [1.2.0](https://github.com/qubic/qx-frontend/compare/v1.1.3...v1.2.0) (2025-03-18)


### Bug Fixes

* extract WalletConnect context and provider into separate files to fix fast refresh issues ([8a69409](https://github.com/qubic/qx-frontend/commit/8a69409d0167600c6ab52c351b28cd21251be6a9))
* update import path for OrderPath type in ConfirmTradeStep component ([afe13a6](https://github.com/qubic/qx-frontend/commit/afe13a6d9f4f2d066f8fd3824cf0618cc3a0fa6a))
* update TradeRow key to use JSON.stringify for improved uniqueness ([6522ef4](https://github.com/qubic/qx-frontend/commit/6522ef47b117a8ede2672e379db1948082a513c9))


### Features

* add 'Check My Orders' button in AssetPage and update translations ([bd797af](https://github.com/qubic/qx-frontend/commit/bd797af3579b1622cc1497c56beb198458b879a9))
* add animation to PortalModalWrapper using react-spring ([df2210b](https://github.com/qubic/qx-frontend/commit/df2210b3d8f2936c49eb16bd3ee954b82ea76e1b))
* add buttons for opening ask and bid orders in AssetPage ([0a706de](https://github.com/qubic/qx-frontend/commit/0a706de745b109022b1fd9e78159e6f7944cd1fe))
* add declined transaction handling and update translations ([3f90aa6](https://github.com/qubic/qx-frontend/commit/3f90aa6bab031ff9106123cdf6e99fe7f85c5b45))
* add disconnect call on session delete event in WalletConnectProvider ([d4c62ed](https://github.com/qubic/qx-frontend/commit/d4c62ed152f23d320733fafc04266b105bdde7e2))
* add dropdown toggle functionality to AccountsSection component ([e2de418](https://github.com/qubic/qx-frontend/commit/e2de4180ab41fe80f9decff1b1ccd286e6f2a6c4))
* add en translations ([e8730e6](https://github.com/qubic/qx-frontend/commit/e8730e69f07e950b95ffbaf294df5375786feb67))
* add en translations ([ad47f91](https://github.com/qubic/qx-frontend/commit/ad47f914e5a174ffd8f8802b553cc8d10278713a))
* add rollup-plugin-visualizer for build analysis and lazy load error images ([0e5e165](https://github.com/qubic/qx-frontend/commit/0e5e16599359d69d34404a1cfae8a18d15064c1a))
* add user rejection handling in wallet connection process ([ac5cc92](https://github.com/qubic/qx-frontend/commit/ac5cc9226b0d67d750220e277e0d85833b4e464c))
* add wallet icon, update account change notification and enhance wallet menu ([d03762e](https://github.com/qubic/qx-frontend/commit/d03762ea0ebbccd30cf03d3d9580237a11f006d0))
* adjust layout of AssetPage ([4d48893](https://github.com/qubic/qx-frontend/commit/4d48893a07a48b24ed821873dc47d32d1c2575e0))
* adjust layout of PublicEntityOrders ([4999820](https://github.com/qubic/qx-frontend/commit/4999820770806bc39a8f05b452d44e6d7bcf6f7f))
* adjust table cell padding and update price alignment ([b729618](https://github.com/qubic/qx-frontend/commit/b729618ebb20dc63dc5a9cdb8d9ab46d20958557))
* adjuts rows and tables layout ([96d4110](https://github.com/qubic/qx-frontend/commit/96d41103fe8427e5d42025acc9fbee2cb53284f3))
* comment unused WalletConnect event listeners ([f09fe4e](https://github.com/qubic/qx-frontend/commit/f09fe4e5f7cd611d5aab259388a64e7660a76b1b))
* conditionally render label in TableHeadCell component ([c8b009a](https://github.com/qubic/qx-frontend/commit/c8b009ab8839eec71f65c3b0cebf1a44ceccac39))
* enhance AccountsSection to support account type distinction and localization ([c179db8](https://github.com/qubic/qx-frontend/commit/c179db8d9e8cb3bfb15af64da41c1a32de3231e4))
* enhance ConfirmTradeStep with validation and user asset balance checks ([ea516b7](https://github.com/qubic/qx-frontend/commit/ea516b7a44f4b48907e6f82b23af85d8d2ff8a00))
* enhance ConnectWalletButton and ConnectWalletMenu with dropdown toggle functionality ([19ddd41](https://github.com/qubic/qx-frontend/commit/19ddd418ade9af6739b5bc61595f276c7ec8ff33))
* enhance DropdownMenu with click outside handling and toggle functionality ([3eee50b](https://github.com/qubic/qx-frontend/commit/3eee50b1cc58782cd14224468c50a67abcdd5112))
* enhance error handling in TradeModal and RemoveOrderModal with new request expired state ([3d008fa](https://github.com/qubic/qx-frontend/commit/3d008fa7b454aaaa1d904d24747f01d496cd72b9))
* enhance table header styling and add fixed height for scrollable areas ([a5a76da](https://github.com/qubic/qx-frontend/commit/a5a76da0197f6ecd5146c9e2d123182eeadc2afb))
* enhance WalletConnectProvider events management ([47fcb2b](https://github.com/qubic/qx-frontend/commit/47fcb2b42f7312cf37d45833af114a8b43c06f66))
* extend button size options to include 'xxs' and adjust size classes for better responsiveness ([37e4e25](https://github.com/qubic/qx-frontend/commit/37e4e252cbfe011e66db65a3b6562cabd2ed7a59))
* implement development logging for WalletConnect context and client ([88c9458](https://github.com/qubic/qx-frontend/commit/88c945815b9ac5e2cb192ec02ab33fcafba6bbfe))
* integrate add assets ask bid orders ([c07fb9f](https://github.com/qubic/qx-frontend/commit/c07fb9fd80dac43024f58f24654014cd5b1ed101))
* integrate ask/bids orders removing ([2982b82](https://github.com/qubic/qx-frontend/commit/2982b82e64827f641c95cdf73cbd211d3a6a12e8))
* prevent reinitialization of WalletConnectClient if already initialized ([63e6b11](https://github.com/qubic/qx-frontend/commit/63e6b11a965f1a51332b68995cb76cc95153e055))
* refactor cancel order modal: ([e856dfa](https://github.com/qubic/qx-frontend/commit/e856dfa2dac609e66a35dcbf5bbabda49e5d7fb6))
* refactor ConnectWalletModal and ConnectWalletStep for improved connection status handling ([c5c9d5d](https://github.com/qubic/qx-frontend/commit/c5c9d5db7e0f56d805c26bbda5fd6841538bf264))
* refactor table components to use TableHead and TableWrapper for improved structure ([d8155d7](https://github.com/qubic/qx-frontend/commit/d8155d77f13df3a146fce71b3fbeb9fac634ebed))
* refactor WalletConnectProvider and wallet-connect-client for improved wallet events handling ([4abd9c9](https://github.com/qubic/qx-frontend/commit/4abd9c973a48f47d81ce27803a3fff40a0a5f822))
* refine proposal expiration handling to exclude specific statuses ([6473d2d](https://github.com/qubic/qx-frontend/commit/6473d2d8de81dd727bf9163056e181bbc1aaeb58))
* rename TOKEN_AMOUNT_CHANGED and update QubicAccountSchema to include assets ([7b95dc3](https://github.com/qubic/qx-frontend/commit/7b95dc30311902c7f56ebab2ac54849e6afcde1b))
* scroll to top on route change in AppLayout component ([ed85edb](https://github.com/qubic/qx-frontend/commit/ed85edb9ecf2fbeb9f3b62f4cbc7b28a6f9972d1))
* set default selected account in WalletConnectProvider on session restoration ([9f29854](https://github.com/qubic/qx-frontend/commit/9f29854f79f7b85f7add259a7fd4f283e79abea8))
* simplify BurgerMenu component after dowpdown updates ([df1709b](https://github.com/qubic/qx-frontend/commit/df1709bcdeab9e06cb0d6971fd4a8240c719a095))
* simplify LanguagePicker by removing unused refs and click outside handling ([010cefd](https://github.com/qubic/qx-frontend/commit/010cefd2aa379e2551ec4e786fccf3f4dcc499bb))
* update AccountsSection to include translation function in dependencies ([983e99c](https://github.com/qubic/qx-frontend/commit/983e99ceacb348b90fab4cc69210d7217e5a4876))
* update ConfirmTradeStep to prevent zero values in price and amount inputs ([c9c2870](https://github.com/qubic/qx-frontend/commit/c9c2870ecfdaa44936d1b5fb923248952ff2ba80))
* update RTL support in modals and dropdown components ([14a73e3](https://github.com/qubic/qx-frontend/commit/14a73e3c6c1e769ca4fb32c309be13205793f885))
* update TradeModal logic to handle wallet connection and correct order type handling ([f5fca06](https://github.com/qubic/qx-frontend/commit/f5fca068d3878d335fb62671b73d09a7f1cca638))
* update translation for ask and bid orders terminology ([91e8df1](https://github.com/qubic/qx-frontend/commit/91e8df1e904f43776c52f8c9adc54e74f94fd797))
* update translations ([4b0abcb](https://github.com/qubic/qx-frontend/commit/4b0abcb7a1cc5eb9719128299f1e978e4369fbb0))
* update translations and add LogoutIcon to AccountActions component ([3b60a80](https://github.com/qubic/qx-frontend/commit/3b60a80b3f5d36339a09dbbb36be956ed3de1fa4))
* update translations for order terminology and adjust header in EntityOwnerOrders component ([d5ab8ff](https://github.com/qubic/qx-frontend/commit/d5ab8ff0164189352549f6f6ef111e7c860a5187))

# [1.2.0-rc.1](https://github.com/qubic/qx-frontend/compare/v1.1.3...v1.2.0-rc.1) (2025-03-18)


### Bug Fixes

* extract WalletConnect context and provider into separate files to fix fast refresh issues ([8a69409](https://github.com/qubic/qx-frontend/commit/8a69409d0167600c6ab52c351b28cd21251be6a9))
* update import path for OrderPath type in ConfirmTradeStep component ([afe13a6](https://github.com/qubic/qx-frontend/commit/afe13a6d9f4f2d066f8fd3824cf0618cc3a0fa6a))
* update TradeRow key to use JSON.stringify for improved uniqueness ([6522ef4](https://github.com/qubic/qx-frontend/commit/6522ef47b117a8ede2672e379db1948082a513c9))


### Features

* add 'Check My Orders' button in AssetPage and update translations ([bd797af](https://github.com/qubic/qx-frontend/commit/bd797af3579b1622cc1497c56beb198458b879a9))
* add animation to PortalModalWrapper using react-spring ([df2210b](https://github.com/qubic/qx-frontend/commit/df2210b3d8f2936c49eb16bd3ee954b82ea76e1b))
* add buttons for opening ask and bid orders in AssetPage ([0a706de](https://github.com/qubic/qx-frontend/commit/0a706de745b109022b1fd9e78159e6f7944cd1fe))
* add declined transaction handling and update translations ([3f90aa6](https://github.com/qubic/qx-frontend/commit/3f90aa6bab031ff9106123cdf6e99fe7f85c5b45))
* add disconnect call on session delete event in WalletConnectProvider ([d4c62ed](https://github.com/qubic/qx-frontend/commit/d4c62ed152f23d320733fafc04266b105bdde7e2))
* add dropdown toggle functionality to AccountsSection component ([e2de418](https://github.com/qubic/qx-frontend/commit/e2de4180ab41fe80f9decff1b1ccd286e6f2a6c4))
* add en translations ([e8730e6](https://github.com/qubic/qx-frontend/commit/e8730e69f07e950b95ffbaf294df5375786feb67))
* add en translations ([ad47f91](https://github.com/qubic/qx-frontend/commit/ad47f914e5a174ffd8f8802b553cc8d10278713a))
* add rollup-plugin-visualizer for build analysis and lazy load error images ([0e5e165](https://github.com/qubic/qx-frontend/commit/0e5e16599359d69d34404a1cfae8a18d15064c1a))
* add user rejection handling in wallet connection process ([ac5cc92](https://github.com/qubic/qx-frontend/commit/ac5cc9226b0d67d750220e277e0d85833b4e464c))
* add wallet icon, update account change notification and enhance wallet menu ([d03762e](https://github.com/qubic/qx-frontend/commit/d03762ea0ebbccd30cf03d3d9580237a11f006d0))
* adjust layout of AssetPage ([4d48893](https://github.com/qubic/qx-frontend/commit/4d48893a07a48b24ed821873dc47d32d1c2575e0))
* adjust layout of PublicEntityOrders ([4999820](https://github.com/qubic/qx-frontend/commit/4999820770806bc39a8f05b452d44e6d7bcf6f7f))
* adjust table cell padding and update price alignment ([b729618](https://github.com/qubic/qx-frontend/commit/b729618ebb20dc63dc5a9cdb8d9ab46d20958557))
* adjuts rows and tables layout ([96d4110](https://github.com/qubic/qx-frontend/commit/96d41103fe8427e5d42025acc9fbee2cb53284f3))
* comment unused WalletConnect event listeners ([f09fe4e](https://github.com/qubic/qx-frontend/commit/f09fe4e5f7cd611d5aab259388a64e7660a76b1b))
* conditionally render label in TableHeadCell component ([c8b009a](https://github.com/qubic/qx-frontend/commit/c8b009ab8839eec71f65c3b0cebf1a44ceccac39))
* enhance AccountsSection to support account type distinction and localization ([c179db8](https://github.com/qubic/qx-frontend/commit/c179db8d9e8cb3bfb15af64da41c1a32de3231e4))
* enhance ConfirmTradeStep with validation and user asset balance checks ([ea516b7](https://github.com/qubic/qx-frontend/commit/ea516b7a44f4b48907e6f82b23af85d8d2ff8a00))
* enhance ConnectWalletButton and ConnectWalletMenu with dropdown toggle functionality ([19ddd41](https://github.com/qubic/qx-frontend/commit/19ddd418ade9af6739b5bc61595f276c7ec8ff33))
* enhance DropdownMenu with click outside handling and toggle functionality ([3eee50b](https://github.com/qubic/qx-frontend/commit/3eee50b1cc58782cd14224468c50a67abcdd5112))
* enhance error handling in TradeModal and RemoveOrderModal with new request expired state ([3d008fa](https://github.com/qubic/qx-frontend/commit/3d008fa7b454aaaa1d904d24747f01d496cd72b9))
* enhance table header styling and add fixed height for scrollable areas ([a5a76da](https://github.com/qubic/qx-frontend/commit/a5a76da0197f6ecd5146c9e2d123182eeadc2afb))
* enhance WalletConnectProvider events management ([47fcb2b](https://github.com/qubic/qx-frontend/commit/47fcb2b42f7312cf37d45833af114a8b43c06f66))
* extend button size options to include 'xxs' and adjust size classes for better responsiveness ([37e4e25](https://github.com/qubic/qx-frontend/commit/37e4e252cbfe011e66db65a3b6562cabd2ed7a59))
* implement development logging for WalletConnect context and client ([88c9458](https://github.com/qubic/qx-frontend/commit/88c945815b9ac5e2cb192ec02ab33fcafba6bbfe))
* integrate add assets ask bid orders ([c07fb9f](https://github.com/qubic/qx-frontend/commit/c07fb9fd80dac43024f58f24654014cd5b1ed101))
* integrate ask/bids orders removing ([2982b82](https://github.com/qubic/qx-frontend/commit/2982b82e64827f641c95cdf73cbd211d3a6a12e8))
* prevent reinitialization of WalletConnectClient if already initialized ([63e6b11](https://github.com/qubic/qx-frontend/commit/63e6b11a965f1a51332b68995cb76cc95153e055))
* refactor cancel order modal: ([e856dfa](https://github.com/qubic/qx-frontend/commit/e856dfa2dac609e66a35dcbf5bbabda49e5d7fb6))
* refactor ConnectWalletModal and ConnectWalletStep for improved connection status handling ([c5c9d5d](https://github.com/qubic/qx-frontend/commit/c5c9d5db7e0f56d805c26bbda5fd6841538bf264))
* refactor table components to use TableHead and TableWrapper for improved structure ([d8155d7](https://github.com/qubic/qx-frontend/commit/d8155d77f13df3a146fce71b3fbeb9fac634ebed))
* refactor WalletConnectProvider and wallet-connect-client for improved wallet events handling ([4abd9c9](https://github.com/qubic/qx-frontend/commit/4abd9c973a48f47d81ce27803a3fff40a0a5f822))
* refine proposal expiration handling to exclude specific statuses ([6473d2d](https://github.com/qubic/qx-frontend/commit/6473d2d8de81dd727bf9163056e181bbc1aaeb58))
* rename TOKEN_AMOUNT_CHANGED and update QubicAccountSchema to include assets ([7b95dc3](https://github.com/qubic/qx-frontend/commit/7b95dc30311902c7f56ebab2ac54849e6afcde1b))
* scroll to top on route change in AppLayout component ([ed85edb](https://github.com/qubic/qx-frontend/commit/ed85edb9ecf2fbeb9f3b62f4cbc7b28a6f9972d1))
* set default selected account in WalletConnectProvider on session restoration ([9f29854](https://github.com/qubic/qx-frontend/commit/9f29854f79f7b85f7add259a7fd4f283e79abea8))
* simplify BurgerMenu component after dowpdown updates ([df1709b](https://github.com/qubic/qx-frontend/commit/df1709bcdeab9e06cb0d6971fd4a8240c719a095))
* simplify LanguagePicker by removing unused refs and click outside handling ([010cefd](https://github.com/qubic/qx-frontend/commit/010cefd2aa379e2551ec4e786fccf3f4dcc499bb))
* update AccountsSection to include translation function in dependencies ([983e99c](https://github.com/qubic/qx-frontend/commit/983e99ceacb348b90fab4cc69210d7217e5a4876))
* update ConfirmTradeStep to prevent zero values in price and amount inputs ([c9c2870](https://github.com/qubic/qx-frontend/commit/c9c2870ecfdaa44936d1b5fb923248952ff2ba80))
* update RTL support in modals and dropdown components ([14a73e3](https://github.com/qubic/qx-frontend/commit/14a73e3c6c1e769ca4fb32c309be13205793f885))
* update TradeModal logic to handle wallet connection and correct order type handling ([f5fca06](https://github.com/qubic/qx-frontend/commit/f5fca068d3878d335fb62671b73d09a7f1cca638))
* update translation for ask and bid orders terminology ([91e8df1](https://github.com/qubic/qx-frontend/commit/91e8df1e904f43776c52f8c9adc54e74f94fd797))
* update translations ([4b0abcb](https://github.com/qubic/qx-frontend/commit/4b0abcb7a1cc5eb9719128299f1e978e4369fbb0))
* update translations and add LogoutIcon to AccountActions component ([3b60a80](https://github.com/qubic/qx-frontend/commit/3b60a80b3f5d36339a09dbbb36be956ed3de1fa4))
* update translations for order terminology and adjust header in EntityOwnerOrders component ([d5ab8ff](https://github.com/qubic/qx-frontend/commit/d5ab8ff0164189352549f6f6ef111e7c860a5187))

## [1.1.3](https://github.com/qubic/qx-frontend/compare/v1.1.2...v1.1.3) (2024-12-30)


### Bug Fixes

* remove filter by moneflew and latest issued assets and transfers ([2994a3b](https://github.com/qubic/qx-frontend/commit/2994a3bab451d3d167cb4c445ce20f167967f587))

## [1.1.2](https://github.com/qubic/qx-frontend/compare/v1.1.1...v1.1.2) (2024-12-18)


### Bug Fixes

* add border to LightweightChart component for improved styling ([8da5293](https://github.com/qubic/qx-frontend/commit/8da5293533fef53c15e6b118c29e1c8e6bfc190e))
* correct skeleton row key casing in TransfersTable component ([a45d0f4](https://github.com/qubic/qx-frontend/commit/a45d0f4f89d7452fc1802a8fbce9d64e662a68d5))

## [1.1.1](https://github.com/qubic/qx-frontend/compare/v1.1.0...v1.1.1) (2024-12-05)


### Bug Fixes

* update Turkish translations for trades and transactions ([1da1c22](https://github.com/qubic/qx-frontend/commit/1da1c2209268b0435fe9ed09e02743160bd888e7))

# [1.1.0](https://github.com/qubic/qx-frontend/compare/v1.0.1...v1.1.0) (2024-12-04)


### Bug Fixes

* swap ask and bid orders in AssetPage and EntityPage components ([cd7342e](https://github.com/qubic/qx-frontend/commit/cd7342eb7a95e413e45b4ea144b541504a20bd5f))


### Features

* enhance tables with proper formating ([8c54953](https://github.com/qubic/qx-frontend/commit/8c549534e66c17c81ae902e6c9cf2e2e86d331ac))

## [1.0.1](https://github.com/qubic/qx-frontend/compare/v1.0.0...v1.0.1) (2024-12-02)


### Bug Fixes

* rename 'asset' to 'entity' in AssetOrderRow component and update constant for table columns ([c33e216](https://github.com/qubic/qx-frontend/commit/c33e21623fff0c13c657af0b87f73a72bbcd50bf))

# 1.0.0 (2024-12-01)


### Bug Fixes

* adjust EntityLink class for improved responsiveness ([0446e11](https://github.com/qubic/qx-frontend/commit/0446e11b82423d0066dfde98a08afc18d96e1757))
* adjust gap spacing in PageLayout component ([c44e4a3](https://github.com/qubic/qx-frontend/commit/c44e4a3db4c91df984d9e89f77a8070f1260f07d))
* center align title in PageLayout component for better presentation ([aeb96f1](https://github.com/qubic/qx-frontend/commit/aeb96f1327c90b58ff8cb20f1acd667dfee73ed1))
* correct asset order row data mapping and update table columns ([04780d4](https://github.com/qubic/qx-frontend/commit/04780d48ef49a3a5f26f40791881315e9797f76c))
* remove decimals column from Issued Assets table ([392c7f0](https://github.com/qubic/qx-frontend/commit/392c7f08f81b0fec9a27d68058b6e75ce55cebeb))
* swap price and shares content in TradeRow and EntityOrderRow components ([948056b](https://github.com/qubic/qx-frontend/commit/948056bc3d84e093bffd4faf3b8d98155d4d92e2))
* update asset details route to include qx prefix ([80ee722](https://github.com/qubic/qx-frontend/commit/80ee72282fc26dd519ee979d457a652e1763ea18))
* update assets route to fix apache issues ([01a9784](https://github.com/qubic/qx-frontend/commit/01a978449c3e45500674e0f8484d2a7db399c481))
* update ExplorerLink component to allow label as ReactNode ([52e2d02](https://github.com/qubic/qx-frontend/commit/52e2d029b957375f249b976ea5767b664040ee2a))
* update import path for envConfig to use kebab-case naming convention ([2b20b9a](https://github.com/qubic/qx-frontend/commit/2b20b9a7a05d7f4cd428df849c8134de3bd8b017))
* update key prop in TransfersRow component ([da6dd07](https://github.com/qubic/qx-frontend/commit/da6dd07c3fac9c2e751816a5356d45ff8600e6fe))
* update logo import in Header component ([a9a0476](https://github.com/qubic/qx-frontend/commit/a9a0476ed5fcb115926c9dfc8c40aca224414d00))
* update navigation routes to use ENTITY.DETAILS for entity links and search ([67f365a](https://github.com/qubic/qx-frontend/commit/67f365afd70854af99228e0950c435a74482a529))
* update translation keys in EntityOrdersTable for consistency ([83abe90](https://github.com/qubic/qx-frontend/commit/83abe90d44effa5d6818f9baefada7ca17657237))
* update translations to remove unnecessary description details and add address field ([8e133ec](https://github.com/qubic/qx-frontend/commit/8e133ec8b3f9aaedf8a5f24696d87ea930a2623d))


### Features

* add 'home' translation to English locale ([c4e877b](https://github.com/qubic/qx-frontend/commit/c4e877b2ff1500d60f790b6e4de66d0671f1f26b))
* add asset-related endpoints and types for improved asset management ([4754b6e](https://github.com/qubic/qx-frontend/commit/4754b6e5d46ae6c3533b5a2647ff97ec8d233aa3))
* add AssetOrdersTable and AssetOrderRow components for displaying asset orders ([52479c9](https://github.com/qubic/qx-frontend/commit/52479c9abd0fbd1ac274f47485820b816b268147))
* add AssetPage and update routing for assets and entities ([f27ea45](https://github.com/qubic/qx-frontend/commit/f27ea459f8f4eedd3e11eff71eeaed97b1532008))
* add ASSETS_ISSUER_ADDRESS constant to qubic utility ([8e41ef7](https://github.com/qubic/qx-frontend/commit/8e41ef7979d4c67d433d42e6ddc79f2e404cc8d9))
* add AssetsPage, AssetsSection, and AssetCard components for asset management ([bfee951](https://github.com/qubic/qx-frontend/commit/bfee9515f0a0aa9cec584e6b4566a8f5ec6f6d62))
* add entity order and trade queries to qx.api and define EntityOrder type ([b4ed78b](https://github.com/qubic/qx-frontend/commit/b4ed78b9349b72617070cbd0a8fb9eaf2a8d2574))
* add EntityLink and ExplorerTxLink components with tooltip support ([c052c51](https://github.com/qubic/qx-frontend/commit/c052c51c19ce06ff4dac5fd348bf06d0fdfa5e05))
* add EntityPage and related components for displaying entity orders and trades ([814fd37](https://github.com/qubic/qx-frontend/commit/814fd37836c3710bed9312ff683f7e648fbd8edc))
* add ErrorRow and NoItemsFoundRow components ([eed0483](https://github.com/qubic/qx-frontend/commit/eed04831b31b0576d74a0e55e0eef9bb4e100230))
* add Explorer icon SVG and export in index ([bd83544](https://github.com/qubic/qx-frontend/commit/bd83544e525da2a0687918a663f54275bd5eaac0))
* add feature flag for Connect Wallet button in Header component ([6f8a988](https://github.com/qubic/qx-frontend/commit/6f8a988d2213899d0970177792e78af894c0f379))
* add getTrades query and Trade type to qxApi ([afedc4e](https://github.com/qubic/qx-frontend/commit/afedc4e176408560144a7c82f65d3c26eb8c60cc))
* add IssuedAssetsTable and IssuedAssetRow components to display issued assets ([d88d122](https://github.com/qubic/qx-frontend/commit/d88d122e0cf020286b21fd0879739fc0dbe993a6))
* add lazy loading for AssetPage and EntityPage in index.ts ([29bf99e](https://github.com/qubic/qx-frontend/commit/29bf99ee6657d3738753cb3df0b59e3e4c8be3f1))
* add lazy-loaded draft Trades and Transactions pages with corresponding exports ([ac4e5e2](https://github.com/qubic/qx-frontend/commit/ac4e5e240f9616dbd60cc9ee2ed5f0b6e1f6edd0))
* add lazy-loaded routes for Assets, Trades, and Transactions pages ([75f6b79](https://github.com/qubic/qx-frontend/commit/75f6b7927df5dcf579c067537f2264125bcb9025))
* add LightweightChart component for visualizing price and volume data ([171ed71](https://github.com/qubic/qx-frontend/commit/171ed71f9933294c7d1967dcd16775e413500f06))
* add new primary color variant 25 ([9363a67](https://github.com/qubic/qx-frontend/commit/9363a67e5224afef7affae3013bfabe240da6cf5))
* add new SVG icons for assets, bars, trades, and transactions ([06e6d7f](https://github.com/qubic/qx-frontend/commit/06e6d7f3a6dd7fa57ebe6b98812191dc73eca211))
* add new translation keys for asset transfers, entity orders, and error messages ([a16af82](https://github.com/qubic/qx-frontend/commit/a16af8227a0d5a857f35df4b0ab79f694e2483e2))
* add PageLayout component for structured page layout and update index exports ([a6717e8](https://github.com/qubic/qx-frontend/commit/a6717e8a8b55f2adee9e5a4e05085a00054677d6))
* add TextInput component for flexible input handling and styling ([430e4ba](https://github.com/qubic/qx-frontend/commit/430e4bab8f9da7abc48ec52d986999ad3973044c))
* add TransferRow component for displaying transaction details in TransfersTable ([fcd6a45](https://github.com/qubic/qx-frontend/commit/fcd6a45d336452432509b3068731d294525b6db9))
* add translation files for ar, de, es, fr, ja , nl, pt, ru, tr, zh ([734729d](https://github.com/qubic/qx-frontend/commit/734729d1594ec9e3573b041691e7efad4fd320db))
* add unique tooltip ID to CopyTextButton for improved accessibility ([4fc0789](https://github.com/qubic/qx-frontend/commit/4fc07895de9e9dd3a148bafd532f8bffc0a85e4d))
* add useGetIssuedAssetsQuery to qxApi for fetching issued assets ([f39ac91](https://github.com/qubic/qx-frontend/commit/f39ac91c3073eccf10daa3f52d806792fc45e3b9))
* add utility function to format RTK Query errors ([b6bd181](https://github.com/qubic/qx-frontend/commit/b6bd181fadcfaacedb7b93f86c65bf7275387103))
* add withHelmet higher-order component and integrate react-helmet-async ([632bb0b](https://github.com/qubic/qx-frontend/commit/632bb0b220e595d0040fed3006baa091bae59f15))
* adjust title font size in PageLayout component ([dbdc3ad](https://github.com/qubic/qx-frontend/commit/dbdc3ad26379f5ca3e3c0911646c522ff9110ef6))
* adjust Tooltip component font size for improved readability ([7b7ae17](https://github.com/qubic/qx-frontend/commit/7b7ae17a15f9d71a316f873d9e72009d0c121f38))
* enhance AssetPage with chart visualization and order tables for improved asset insights ([be005f7](https://github.com/qubic/qx-frontend/commit/be005f74c938113ab6a8e76775805eb4c32b8038))
* enhance AssetsPage with Helmet for SEO and improve structure ([e2584ed](https://github.com/qubic/qx-frontend/commit/e2584ed55573ae3259bb967f2d97d92fc48ea0ab))
* enhance EntityPage layout with ExplorerLink and address display ([2340e42](https://github.com/qubic/qx-frontend/commit/2340e42517f62949fc997a73700952f3c0f46854))
* enhance ExplorerLink component to support address links and customizable tooltip content ([a7f8df6](https://github.com/qubic/qx-frontend/commit/a7f8df65c86984ce48a7bf39a71cdb2e297e9325))
* enhance formatDate function with options for short date format and time zone exclusion ([eca3e39](https://github.com/qubic/qx-frontend/commit/eca3e39759ec4af1772197743042b6fbd674395a))
* enhance HomePage with Helmet for improved SEO ([f854f9f](https://github.com/qubic/qx-frontend/commit/f854f9fd4f54e5e46120b51347bc2d1987ded241))
* enhance Tooltip component ([a71bb71](https://github.com/qubic/qx-frontend/commit/a71bb71f3d71a9b78ccf387c46c00c946d60ad02))
* enhance TransactionsPage and IssuedAssetsTable with error handling ([f69d246](https://github.com/qubic/qx-frontend/commit/f69d246d39b2cfea264674dc8e9303c980b8f403))
* extend tailwind-merge configuration and remove unnecessary important ([32f647b](https://github.com/qubic/qx-frontend/commit/32f647b37bffc1c3f3e726a21a4b2bcbabe71d59))
* implement HomePage with dashboard menu and trader search functionality ([379d8aa](https://github.com/qubic/qx-frontend/commit/379d8aa650e075c9d9239e6d294d900bed5e40f6))
* implement TradesPage with trades fetching and display, add TradesTable and TradeRow components ([c69286c](https://github.com/qubic/qx-frontend/commit/c69286c0b1069a71c2f8fce6ed09a73f77f17297))
* implement TransactionsPage with transfers ([e986485](https://github.com/qubic/qx-frontend/commit/e98648559dbde720b1581dcf4c68bd5df4ac23b5))
* install lightweight-charts ([c9fb025](https://github.com/qubic/qx-frontend/commit/c9fb02581744a1abeebbbfde48f0d389d8de6654))
* optimize chart display logic in AssetPage for better performance ([6d480b9](https://github.com/qubic/qx-frontend/commit/6d480b98efdc5715e8a68224a18a852c8856cca7))
* refactor DropdownMenu.Trigger to use forwardRef for improved ref handling ([1a22431](https://github.com/qubic/qx-frontend/commit/1a224313fcf4a0e5af3f2cd62e1bd38b5a386546))
* refactor EntityPage to streamline data fetching and add ExplorerLink component ([db6cbfe](https://github.com/qubic/qx-frontend/commit/db6cbfe14bc3b16941e3003fc914c032e2bba2ce))
* refactor header component to include a burger menu and improve layout ([9c77e57](https://github.com/qubic/qx-frontend/commit/9c77e57b81ddda9356accbd420aff2560cd6049f))
* refactor header import to named export and create index file for Header component ([82838ea](https://github.com/qubic/qx-frontend/commit/82838ea4cb4484870987b5ae13c3281c4bd62991))
* refactor TradesTable and TradeRow components ([ef047c2](https://github.com/qubic/qx-frontend/commit/ef047c2fb70819a3149def9d0e2452766269f56c))
* rename ExplorerTxLink to ExplorerLink and enhance it ([386c162](https://github.com/qubic/qx-frontend/commit/386c162f61c64232feaf189671232cac65730521))
* update BASE_URL to include API versioning for qxApi ([5467d7f](https://github.com/qubic/qx-frontend/commit/5467d7f5dcecda32756fd607fcfd9741ab75cf71))
* update Button component to prevent text wrapping with whitespace-nowrap class ([634172f](https://github.com/qubic/qx-frontend/commit/634172faf9231394d3d31696d2f7e26e558b9c70))
* update english translations ([511f184](https://github.com/qubic/qx-frontend/commit/511f1849a9c032dfb25a92a4b96dbdecf60db1eb))
* update logo export and add new QubicQxWhiteLogo SVG ([b8e33e0](https://github.com/qubic/qx-frontend/commit/b8e33e0fb8b8777337cf1b3a0151e25dfc1e536a))
* update meta description for Qubic Network ([ca5e122](https://github.com/qubic/qx-frontend/commit/ca5e122186a4a136c80fab946384452efb7bf323))
* update translations ([7fdbe18](https://github.com/qubic/qx-frontend/commit/7fdbe188f07c0e1246e77846d630f071446a4bdd))
* update translations for trades page with new keys and error messages ([32edd6a](https://github.com/qubic/qx-frontend/commit/32edd6a7a1d04f612d249dee52883b66e91a8da4))
* update translations with new terms for tokens, assets, trades, and smart contract shares ([00d91cb](https://github.com/qubic/qx-frontend/commit/00d91cb29aab19c1c4ec6ab9df4452e356be392a))
* update visibility breakpoint for BurgerMenu in Header component ([748c480](https://github.com/qubic/qx-frontend/commit/748c480bcc3a11e6e768f7ba2a282d47f23fd507))
