# [1.9.0](https://github.com/dictyBase/graphql-schema/compare/1.8.1...1.9.0) (2022-09-06)


### Bug Fixes

* allPublications does not need to return an array ([f9dc7f4](https://github.com/dictyBase/graphql-schema/commit/f9dc7f49ba6d8aa7d4f62ed37fa3e0eb2c2273c3))
* Associated Sequence should return object not array ([d7835ee](https://github.com/dictyBase/graphql-schema/commit/d7835ee6699cde368f2885e3808a048798c3ac97))
* Change alt_protein_name to alt_protein_names + string to string array ([b590964](https://github.com/dictyBase/graphql-schema/commit/b590964c23d883adc8fd4fdc26819ef30aec313f))
* change general_info from array to singular object ([680cee2](https://github.com/dictyBase/graphql-schema/commit/680cee29fb8400e1c192265ea92dd831aa6b79ad))
* change general_info to object ([9d26d1e](https://github.com/dictyBase/graphql-schema/commit/9d26d1e006bb8cbaaec97747e48ce075652ec01f))
* expression should be array of strings ([8b00d7a](https://github.com/dictyBase/graphql-schema/commit/8b00d7a03353790fba4807a0e03a8f25cb5fb440))
* fix gene queries to account for NameWithLink ([2504df6](https://github.com/dictyBase/graphql-schema/commit/2504df65bb48d69777fefb6e602faf13a347e541))
* genbank_mrna is not required ([3a02180](https://github.com/dictyBase/graphql-schema/commit/3a02180653780347533c0b26f770412789057a5f))
* make ests required ([a637719](https://github.com/dictyBase/graphql-schema/commit/a6377190db9bfd9ec1488e0777ef4801aeb701ef))
* make expression and ext_resources required ([4d644e0](https://github.com/dictyBase/graphql-schema/commit/4d644e0d0cee6d3975e47484fe01add0c64ee42c))
* make name_description required ([37c9734](https://github.com/dictyBase/graphql-schema/commit/37c97347c50e58bbb3dcef1a80f8b662635431f3))
* Make publications field required in NumberOfPublicationsWithGene ([24b2f79](https://github.com/dictyBase/graphql-schema/commit/24b2f79a7915ee5a248d52e3a33069d7a787f001))


### Features

* add allOrthologs query ([0df6bcb](https://github.com/dictyBase/graphql-schema/commit/0df6bcb0bb5d65020d395bff472411a3beb565de))
* add Associated Sequences to gene schema ([b0545c1](https://github.com/dictyBase/graphql-schema/commit/b0545c18a6fd164c3f8f64003b5871b3af327c8b))
* add general information to gene ([3ee7c33](https://github.com/dictyBase/graphql-schema/commit/3ee7c332a63a74806ee68f53051846ae41a1004f))
* add generated output from apollo-client-helpers plugin ([d533509](https://github.com/dictyBase/graphql-schema/commit/d5335090b90654a16b61c4d61aefb71b54d87e96))
* add GenomicCoordinates to Gene ProductInformation ([0c9fb85](https://github.com/dictyBase/graphql-schema/commit/0c9fb8526062d3be1f0a511aeb6d8f41091c37e2))
* Add Links to Gene ([5641aab](https://github.com/dictyBase/graphql-schema/commit/5641aabef0b732420ed0e076e4607a2491744920))
* add more link to associated sequence ([1eee578](https://github.com/dictyBase/graphql-schema/commit/1eee57826fa6c682e9daa797e50b2eb98cb717ae))
* add msw mock plugin and it's generated output ([1f502f0](https://github.com/dictyBase/graphql-schema/commit/1f502f0639bd7a7f28c59a64279a86882d877b47))
* Add NameWithLink type ([da5e9fe](https://github.com/dictyBase/graphql-schema/commit/da5e9fee95f37f332ed87b43be40b01da591e2b9))
* add num_pubs to gene ([193d193](https://github.com/dictyBase/graphql-schema/commit/193d1936b8ba4574aa66aadbf60c00f55cd69305))
* add optional limit to allPublications in Gene query ([e254c50](https://github.com/dictyBase/graphql-schema/commit/e254c508770d22189b4d3b4e5b56de63846b48e2))
* add orthologs schema ([6af7981](https://github.com/dictyBase/graphql-schema/commit/6af79814474744de373be5148d58a730f55a74cd))
* add Protein Coding Gene ([8d4e6ff](https://github.com/dictyBase/graphql-schema/commit/8d4e6ff046d6a25a981d5b6e79ed4516b2a44245))
* Add Protein information schema ([68041f9](https://github.com/dictyBase/graphql-schema/commit/68041f90110f6d5eeca6f59573e008b93a57b29b))
* add protein length, molecular data, and more info to gene schema ([9c267f4](https://github.com/dictyBase/graphql-schema/commit/9c267f4c21f8e0635a8386892edfcdff8bd89376))
* add sort_by default desc to Gene allPublications ([9490437](https://github.com/dictyBase/graphql-schema/commit/9490437bdac2e14b790ca1d13f1c85b8435c2456))
* add strain type enum ([c1296b9](https://github.com/dictyBase/graphql-schema/commit/c1296b97a18ba4888da70bc63dbbd2785ce7c64f))
* add the generated types ([6cfb639](https://github.com/dictyBase/graphql-schema/commit/6cfb6398385233593e614c7c2ea8b9c39dce8452))
* add typescript output file from fragment-matcher plugin ([f9c4480](https://github.com/dictyBase/graphql-schema/commit/f9c448076b6421c549ea11765cab74c3fe66275d))
* allow genbank_genomic_fragment to be null ([ee3b4e2](https://github.com/dictyBase/graphql-schema/commit/ee3b4e21ee41688b729f9d58c46222b7e6f5bf0c))
* change AssociatedSequences to NameWithLink type and add genbank_mrna ([0cff2d0](https://github.com/dictyBase/graphql-schema/commit/0cff2d097098ade9bb629d445fd6c50310c5a260))
* change id and uniprotkb to NameWithLink ([bb4ea49](https://github.com/dictyBase/graphql-schema/commit/bb4ea49a8e7c10d085d1d4f4df1691c05b5e9d18))
* change protein_coding_gene from String to NameWithLink ([dac269d](https://github.com/dictyBase/graphql-schema/commit/dac269deea873749e1feb653b51c94b39e76cccc))
* make genomic_coords required ([fd5d1c6](https://github.com/dictyBase/graphql-schema/commit/fd5d1c6f7d742f57499f3dfcd657a36a479ce604))
* yarn compile changes ([43e97ba](https://github.com/dictyBase/graphql-schema/commit/43e97badaedbdafe696284b8daa02488a8c7be85))
* yarn compile NumberOfPublicationsWithGene ([0eda7a6](https://github.com/dictyBase/graphql-schema/commit/0eda7a612707c9725f8d0f352fc2d209e1d461d5))

## [1.8.1](https://github.com/dictyBase/graphql-schema/compare/1.8.0...1.8.1) (2022-01-20)

# [1.8.0](https://github.com/dictyBase/graphql-schema/compare/1.7.1...1.8.0) (2022-01-06)


### Features

* generate types due to reverting to built-in Maybe type definition ([0d4043d](https://github.com/dictyBase/graphql-schema/commit/0d4043d9103cab7bee9b2a85ef5c4cd3e8176bd4))

## [1.7.1](https://github.com/dictyBase/graphql-schema/compare/1.7.0...1.7.1) (2022-01-05)

# [1.7.0](https://github.com/dictyBase/graphql-schema/compare/1.6.0...1.7.0) (2022-01-04)


### Features

* return array of PublicationWithGene ([22ed6f3](https://github.com/dictyBase/graphql-schema/commit/22ed6f3631cd949c2cadd146bc3e4a80fee777d7))

# [1.6.0](https://github.com/dictyBase/graphql-schema/compare/1.5.0...1.6.0) (2022-01-04)


### Bug Fixes

* delete duplicate and capitalize query ([59b2189](https://github.com/dictyBase/graphql-schema/commit/59b21893fb0c8545cce5e88301af4c34a41e09b6))
* fix merge conflict in query.graphql ([db67e04](https://github.com/dictyBase/graphql-schema/commit/db67e04d517f52828d8144655ad40dd373171df0))
* update index.ts ([1e81de5](https://github.com/dictyBase/graphql-schema/commit/1e81de566d63b924173e76e257b0c7cbfe10722e))


### Features

* add listRecent queries for plasmid, strains, and genes ([222949c](https://github.com/dictyBase/graphql-schema/commit/222949c04f0cd95dd5229bd186dea85824d26908))
* add listRecent queries for plasmid, strains, and genes ([2cae414](https://github.com/dictyBase/graphql-schema/commit/2cae414d3d351052824278d793f09cfee15d6989))
* make array type mandatory ([de0e9ce](https://github.com/dictyBase/graphql-schema/commit/de0e9cea9f3e7699535df7f9d9edaa4341d3b293))

# [1.5.0](https://github.com/dictyBase/graphql-schema/compare/1.4.0...1.5.0) (2022-01-03)


### Features

* add allPublications query ([0c380cf](https://github.com/dictyBase/graphql-schema/commit/0c380cf95674a88152e776bff3a816afcfa246c8))
* add gene field replacing gene_id and gene_name ([9c37ad1](https://github.com/dictyBase/graphql-schema/commit/9c37ad1246fc6298505aba20cdd1c92e21eaeb6d))
* create base publication interface and extend publication types ([0ab813b](https://github.com/dictyBase/graphql-schema/commit/0ab813b7c12422f240533c63d3dbdb41207b7834))
* rename gene field ([8e7aa84](https://github.com/dictyBase/graphql-schema/commit/8e7aa841be1b6ed71acf25f93277aadfb4045b48))

# [1.4.0](https://github.com/dictyBase/graphql-schema/compare/1.3.0...1.4.0) (2021-12-15)


### Features

* generate types ([6a18127](https://github.com/dictyBase/graphql-schema/commit/6a181272855be94d8ce1ebd40283a2dab12e64bc))
* remove first_name as mandatory ([c6aba31](https://github.com/dictyBase/graphql-schema/commit/c6aba314f2bb1ab11472822b8e21ea138fec73fd))

# [1.3.0](https://github.com/dictyBase/graphql-schema/compare/1.2.0...1.3.0) (2021-12-15)


### Bug Fixes

* yarn.lock dependency issue ([84cc532](https://github.com/dictyBase/graphql-schema/commit/84cc53229bd6292b501b2b92d2d5472e24cc5315))
* yarn.lock dependency issue for dependabot/npm_and_yarn/graphql-codegen/cli-2.3.0 PR ([f748afc](https://github.com/dictyBase/graphql-schema/commit/f748afc983d2b0ca43cb813f3cf97e3a89f883a9))


### Features

* new mandatory author fields - last_name and first_name ([ed745ad](https://github.com/dictyBase/graphql-schema/commit/ed745ad986396aa3c596a03980b16359886e099a))
* new mandatory fields - title, author, journal, pub_type, abstract, and source ([13a3c99](https://github.com/dictyBase/graphql-schema/commit/13a3c994c4b787c420ea2119e2d01cc9a8912b72))

# [1.2.0](https://github.com/dictyBase/graphql-schema/compare/1.1.4...1.2.0) (2021-11-29)


### Bug Fixes

* move publications inside phenotypes ([9b7c59c](https://github.com/dictyBase/graphql-schema/commit/9b7c59c94468eb7da47cde580339525028be4a81))
* typo with publication field ([db33eff](https://github.com/dictyBase/graphql-schema/commit/db33eff08449aaf06a4d0c9852baeb708e946b14))


### Features

* add allStrains to the query type ([6aeb15d](https://github.com/dictyBase/graphql-schema/commit/6aeb15d437dca41a18fb090ea3add0ba2e8f6737))
* add author rank in addition to their last name ([e0c92fc](https://github.com/dictyBase/graphql-schema/commit/e0c92fc1b762126d648edbba872cdcf85af94d2f))
* generate new types with yarn run compile ([da82447](https://github.com/dictyBase/graphql-schema/commit/da824473c41a8fcd14f4759b3e6a46afa0103c25))

## [1.1.4](https://github.com/dictyBase/graphql-schema/compare/1.1.3...1.1.4) (2021-11-04)


### Bug Fixes

* update dist with latest version of schema ([f45f2f7](https://github.com/dictyBase/graphql-schema/commit/f45f2f7a97449e698b784075749b86ee8b733914))

## [1.1.3](https://github.com/dictyBase/graphql-schema/compare/1.1.2...1.1.3) (2021-11-04)


### Bug Fixes

* generate types for default value ([cce7a14](https://github.com/dictyBase/graphql-schema/commit/cce7a14459159136f48e4493f4ea35f992ba4a0d))

## [1.1.2](https://github.com/dictyBase/graphql-schema/compare/1.1.1...1.1.2) (2021-11-03)


### Bug Fixes

* a separate file for query is not required ([7578c29](https://github.com/dictyBase/graphql-schema/commit/7578c292c2857bb5584ee1fc858a06089178b01d))
* a separate file for query is not required ([bc29bc2](https://github.com/dictyBase/graphql-schema/commit/bc29bc2f227355193fb26d44cc7a3d423a188dd1))
* add publication query in query file ([87dc8d2](https://github.com/dictyBase/graphql-schema/commit/87dc8d2e0baf11f5d94084090d3256ecafe67bd5))
* add publication query in query file ([7d8267a](https://github.com/dictyBase/graphql-schema/commit/7d8267ad161bf67145a4d99891cb84e2097cb079))
* replace the html version of dependabot configuration ([0c05ad1](https://github.com/dictyBase/graphql-schema/commit/0c05ad1c46ef419d2ba933eb8ef0db3832a19937))

## [1.1.1](https://github.com/dictyBase/graphql-schema/compare/1.1.0...1.1.1) (2021-10-07)


### Bug Fixes

* remove unnecessary pacakges ([70effec](https://github.com/dictyBase/graphql-schema/commit/70effecda87f0fd6f152c864cf138a79a56aeb9f))
* replace the html version of dependabot configuration ([830b8fa](https://github.com/dictyBase/graphql-schema/commit/830b8fa37e2fb5e6cf1c8dbb03c722b10ffe97ee))

## [1.1.1](https://github.com/dictyBase/graphql-schema/compare/1.1.0...1.1.1) (2021-10-07)


### Bug Fixes

* remove unnecessary pacakges ([70effec](https://github.com/dictyBase/graphql-schema/commit/70effecda87f0fd6f152c864cf138a79a56aeb9f))
* replace the html version of dependabot configuration ([830b8fa](https://github.com/dictyBase/graphql-schema/commit/830b8fa37e2fb5e6cf1c8dbb03c722b10ffe97ee))

## [1.1.1](https://github.com/dictyBase/graphql-schema/compare/1.1.0...1.1.1) (2021-10-07)


### Bug Fixes

* remove unnecessary pacakges ([70effec](https://github.com/dictyBase/graphql-schema/commit/70effecda87f0fd6f152c864cf138a79a56aeb9f))

# [1.1.0](https://github.com/dictyBase/graphql-schema/compare/1.0.1...1.1.0) (2021-05-04)


### Features

* add publication query ([8f15609](https://github.com/dictyBase/graphql-schema/commit/8f15609fcdce139687a79de1dcceed2eb749844b))

## [1.0.1](https://github.com/dictyBase/graphql-schema/compare/1.0.0...1.0.1) (2021-04-26)

# 1.0.0 (2021-04-22)


### Bug Fixes

* add graphql route ([4e483ae](https://github.com/dictyBase/graphql-schema/commit/4e483ae0aca53679ead2cb17fc99231886b8e34e))
* correct typo for courier_account ([216336e](https://github.com/dictyBase/graphql-schema/commit/216336ef78dd92d3b111b433814d237bf9776ae6))
* created_by and updated_by should return User ([5e066b0](https://github.com/dictyBase/graphql-schema/commit/5e066b06100ad3892019e8413d9e2a6e606b4f01))
* fix typo ([91f6a3c](https://github.com/dictyBase/graphql-schema/commit/91f6a3c9c97f245ef82f87bdf08d077fd715a7cf))
* remove unusable filter from anno query ([0e9b546](https://github.com/dictyBase/graphql-schema/commit/0e9b546d71ca13dadd869a7d23b7adffe995880f))
* use string for geneByName ([119aafb](https://github.com/dictyBase/graphql-schema/commit/119aafb000f7431b5a16b5b3f7796d5b8d04ea2d))


### Features

* add auth api schema ([3a2cd35](https://github.com/dictyBase/graphql-schema/commit/3a2cd35273d3a71c38ae9dc9675db691a5929a25))
* add content api schema ([b2231cb](https://github.com/dictyBase/graphql-schema/commit/b2231cb1e6903acf8f3eb6f1aaa4379ba76b67f1))
* add filters to annotation list queries ([d9c8dcf](https://github.com/dictyBase/graphql-schema/commit/d9c8dcf1bb94dfb89da2189f9551f2c33bf586ac))
* add graphql validation action ([79d2f34](https://github.com/dictyBase/graphql-schema/commit/79d2f34bcb4254b344cd0a65b865f7630a912b9d))
* add name to with schema ([a8637ae](https://github.com/dictyBase/graphql-schema/commit/a8637ae73f43d47cb45db6b1bf632af39cbc7a7d))
* add new queries for getting stock lists ([35160f7](https://github.com/dictyBase/graphql-schema/commit/35160f772681fe299b2c75e2c1b86ab24f15a4e8))
* add plugins for operations and apollo ([c70e82b](https://github.com/dictyBase/graphql-schema/commit/c70e82bebbe5a1385773633bf8b9b20b55d06fe8))
* add queries and mutations ([b6dceb9](https://github.com/dictyBase/graphql-schema/commit/b6dceb9a862ca56fbe558244e0f462bae4f410d2))
* add queries for listing strains by annotation ([5a17afa](https://github.com/dictyBase/graphql-schema/commit/5a17afa00b0bfb4d941bb00546eea896a7a9246b))
* add query for getting list of strains with characteristic ([c37036c](https://github.com/dictyBase/graphql-schema/commit/c37036c6964d3b674311d6233222b82c6d159401))
* add query to list organisms ([b5c2a50](https://github.com/dictyBase/graphql-schema/commit/b5c2a5025917b8d3274ff3b940fb9746ca94b1fb))
* add schema for downloads page ([43856e7](https://github.com/dictyBase/graphql-schema/commit/43856e73a691061f3f6c0123f64f9e1defb2050c))
* add schema for gene page ([15ddaf8](https://github.com/dictyBase/graphql-schema/commit/15ddaf8547c90f54286b98affdaaf47d3aab3439))
* add script to generate types ([46810af](https://github.com/dictyBase/graphql-schema/commit/46810afa0e902722b57c6340384c343bd1cf8eab))
* add semantic-release ([3d4e4aa](https://github.com/dictyBase/graphql-schema/commit/3d4e4aa27f12a35f79df3aa8ad273d12c7a4f09c))
* add stock queries and mutations ([1b6cb44](https://github.com/dictyBase/graphql-schema/commit/1b6cb44f802bd060672e224f5974f37bc7c3c24d))
* add typings ([2077fd5](https://github.com/dictyBase/graphql-schema/commit/2077fd572eb1993c9a7122dd0dcb1e45e4d6c3a7))
* add user, dsc, publication schema ([9c2310a](https://github.com/dictyBase/graphql-schema/commit/9c2310ac1b00f8380a30232fb3ca7481ad9ebb34))
* combine graphql schemas for validation ([12b6b5d](https://github.com/dictyBase/graphql-schema/commit/12b6b5dfd497610ac299ab362ae3ca5476e5ec2a))
* generate new types for queries and apollo ([b02c02e](https://github.com/dictyBase/graphql-schema/commit/b02c02ec7dad78dbc415ba79f901715d4e18fd17))
