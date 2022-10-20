import * as Apollo from '@apollo/client';

declare type Maybe<T> = T | null;
declare type InputMaybe<T> = Maybe<T>;
declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Timestamp: any;
};
declare type AssociatedSequences = {
    __typename?: 'AssociatedSequences';
    ests: Array<NameWithLink>;
    genbank_genomic_fragment?: Maybe<NameWithLink>;
    genbank_mrna?: Maybe<NameWithLink>;
    more_link: Scalars['String'];
};
declare type Auth = {
    __typename?: 'Auth';
    identity: Identity;
    token: Scalars['String'];
    user: User;
};
declare type Author = {
    __typename?: 'Author';
    first_name?: Maybe<Scalars['String']>;
    initials?: Maybe<Scalars['String']>;
    last_name: Scalars['String'];
    rank?: Maybe<Scalars['String']>;
};
declare type BasePublication = {
    abstract: Scalars['String'];
    authors: Array<Author>;
    doi?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    issn?: Maybe<Scalars['String']>;
    issue?: Maybe<Scalars['String']>;
    journal: Scalars['String'];
    pages?: Maybe<Scalars['String']>;
    pub_date?: Maybe<Scalars['Timestamp']>;
    pub_type: Scalars['String'];
    source: Scalars['String'];
    status?: Maybe<Scalars['String']>;
    title: Scalars['String'];
    volume?: Maybe<Scalars['String']>;
};
declare type Citation = {
    __typename?: 'Citation';
    authors: Scalars['String'];
    journal: Scalars['String'];
    pubmed_id: Scalars['String'];
    title: Scalars['String'];
};
declare type Content = {
    __typename?: 'Content';
    content: Scalars['String'];
    created_at: Scalars['Timestamp'];
    created_by: User;
    id: Scalars['ID'];
    name: Scalars['String'];
    namespace: Scalars['String'];
    slug: Scalars['String'];
    updated_at: Scalars['Timestamp'];
    updated_by: User;
};
declare type CreateContentInput = {
    content: Scalars['String'];
    created_by: Scalars['String'];
    name: Scalars['String'];
    namespace: Scalars['String'];
};
declare type CreateOrderInput = {
    comments?: InputMaybe<Scalars['String']>;
    consumer: Scalars['String'];
    courier: Scalars['String'];
    courier_account: Scalars['String'];
    items: Array<Scalars['String']>;
    payer: Scalars['String'];
    payment: Scalars['String'];
    purchase_order_num?: InputMaybe<Scalars['String']>;
    purchaser: Scalars['String'];
    status: StatusEnum;
};
declare type CreatePermissionInput = {
    description: Scalars['String'];
    permission: Scalars['String'];
    resource: Scalars['String'];
};
declare type CreatePlasmidInput = {
    created_by: Scalars['String'];
    dbxrefs?: InputMaybe<Array<Scalars['String']>>;
    depositor?: InputMaybe<Scalars['String']>;
    editable_summary?: InputMaybe<Scalars['String']>;
    genbank_accession?: InputMaybe<Scalars['String']>;
    genes?: InputMaybe<Array<Scalars['String']>>;
    image_map?: InputMaybe<Scalars['String']>;
    in_stock: Scalars['Boolean'];
    keywords?: InputMaybe<Array<Scalars['String']>>;
    name: Scalars['String'];
    publications?: InputMaybe<Array<Scalars['String']>>;
    sequence?: InputMaybe<Scalars['String']>;
    summary?: InputMaybe<Scalars['String']>;
    updated_by: Scalars['String'];
};
declare type CreateRoleInput = {
    description: Scalars['String'];
    role: Scalars['String'];
};
declare type CreateStrainInput = {
    characteristics?: InputMaybe<Array<Scalars['String']>>;
    created_by: Scalars['String'];
    dbxrefs?: InputMaybe<Array<Scalars['String']>>;
    depositor?: InputMaybe<Scalars['String']>;
    editable_summary?: InputMaybe<Scalars['String']>;
    genes?: InputMaybe<Array<Scalars['String']>>;
    genetic_modification?: InputMaybe<Scalars['String']>;
    genotypes?: InputMaybe<Array<Scalars['String']>>;
    in_stock: Scalars['Boolean'];
    label: Scalars['String'];
    mutagenesis_method?: InputMaybe<Scalars['String']>;
    names?: InputMaybe<Array<Scalars['String']>>;
    parent?: InputMaybe<Scalars['String']>;
    phenotypes?: InputMaybe<Array<Scalars['String']>>;
    plasmid?: InputMaybe<Scalars['String']>;
    publications?: InputMaybe<Array<Scalars['String']>>;
    species: Scalars['String'];
    summary?: InputMaybe<Scalars['String']>;
    systematic_name: Scalars['String'];
    updated_by: Scalars['String'];
};
declare type CreateUserInput = {
    city?: InputMaybe<Scalars['String']>;
    country?: InputMaybe<Scalars['String']>;
    email: Scalars['String'];
    first_address?: InputMaybe<Scalars['String']>;
    first_name: Scalars['String'];
    group_name?: InputMaybe<Scalars['String']>;
    is_active: Scalars['Boolean'];
    last_name: Scalars['String'];
    organization?: InputMaybe<Scalars['String']>;
    phone?: InputMaybe<Scalars['String']>;
    second_address?: InputMaybe<Scalars['String']>;
    state?: InputMaybe<Scalars['String']>;
    zipcode?: InputMaybe<Scalars['String']>;
};
declare type DeleteContent = {
    __typename?: 'DeleteContent';
    success: Scalars['Boolean'];
};
declare type DeletePermission = {
    __typename?: 'DeletePermission';
    success: Scalars['Boolean'];
};
declare type DeleteRole = {
    __typename?: 'DeleteRole';
    success: Scalars['Boolean'];
};
declare type DeleteStock = {
    __typename?: 'DeleteStock';
    success: Scalars['Boolean'];
};
declare type DeleteUser = {
    __typename?: 'DeleteUser';
    success: Scalars['Boolean'];
};
declare type Download = {
    __typename?: 'Download';
    items: Array<DownloadItem>;
    title: Scalars['String'];
};
declare type DownloadItem = {
    __typename?: 'DownloadItem';
    title: Scalars['String'];
    url: Scalars['String'];
};
declare type Extension = {
    __typename?: 'Extension';
    db: Scalars['String'];
    id: Scalars['String'];
    name: Scalars['String'];
    relation: Scalars['String'];
};
declare type GoAnnotation = {
    __typename?: 'GOAnnotation';
    assigned_by: Scalars['String'];
    date: Scalars['String'];
    evidence_code: Scalars['String'];
    extensions?: Maybe<Array<Extension>>;
    go_term: Scalars['String'];
    id: Scalars['String'];
    publication: Scalars['String'];
    qualifier: Scalars['String'];
    type: Scalars['String'];
    with?: Maybe<Array<With>>;
};
declare type Gene = {
    __typename?: 'Gene';
    associated_sequences: AssociatedSequences;
    general_info: GeneralInfo;
    goas?: Maybe<Array<GoAnnotation>>;
    id: Scalars['String'];
    links: Links;
    name: Scalars['String'];
    orthologs?: Maybe<Array<Orthologs>>;
    product_info?: Maybe<Array<ProductInformation>>;
    protein_information?: Maybe<ProteinInformation>;
    strains?: Maybe<Array<Strain>>;
};
declare type GeneralInfo = {
    __typename?: 'GeneralInfo';
    alt_gene_name?: Maybe<Array<Scalars['String']>>;
    alt_protein_names?: Maybe<Array<Scalars['String']>>;
    description: Scalars['String'];
    gene_product: Scalars['String'];
    name_description: Array<Scalars['String']>;
};
declare type GenomicCoordinates = {
    __typename?: 'GenomicCoordinates';
    chrom_coords: Scalars['String'];
    exon: Scalars['String'];
    local_coords: Scalars['String'];
};
declare type Identity = {
    __typename?: 'Identity';
    created_at: Scalars['Timestamp'];
    id: Scalars['ID'];
    identifier: Scalars['String'];
    provider: Scalars['String'];
    updated_at: Scalars['Timestamp'];
    user_id: Scalars['ID'];
};
declare type Links = {
    __typename?: 'Links';
    colleagues: NameWithLink;
    expression: Array<NameWithLink>;
    ext_resources: Array<NameWithLink>;
};
declare type LoginInput = {
    client_id: Scalars['String'];
    code: Scalars['String'];
    provider: Scalars['String'];
    redirect_url: Scalars['String'];
    scopes: Scalars['String'];
    state: Scalars['String'];
};
declare type Logout = {
    __typename?: 'Logout';
    success: Scalars['Boolean'];
};
declare type Mutation = {
    __typename?: 'Mutation';
    createContent?: Maybe<Content>;
    createOrder?: Maybe<Order>;
    createPermission?: Maybe<Permission>;
    createPlasmid?: Maybe<Plasmid>;
    createRole?: Maybe<Role>;
    createRolePermissionRelationship?: Maybe<Role>;
    createStrain?: Maybe<Strain>;
    createUser?: Maybe<User>;
    createUserRoleRelationship?: Maybe<User>;
    deleteContent?: Maybe<DeleteContent>;
    deletePermission?: Maybe<DeletePermission>;
    deleteRole?: Maybe<DeleteRole>;
    deleteStock?: Maybe<DeleteStock>;
    deleteUser?: Maybe<DeleteUser>;
    login?: Maybe<Auth>;
    logout?: Maybe<Logout>;
    updateContent?: Maybe<Content>;
    updateOrder?: Maybe<Order>;
    updatePermission?: Maybe<Permission>;
    updatePlasmid?: Maybe<Plasmid>;
    updateRole?: Maybe<Role>;
    updateStrain?: Maybe<Strain>;
    updateUser?: Maybe<User>;
};
declare type MutationCreateContentArgs = {
    input?: InputMaybe<CreateContentInput>;
};
declare type MutationCreateOrderArgs = {
    input?: InputMaybe<CreateOrderInput>;
};
declare type MutationCreatePermissionArgs = {
    input?: InputMaybe<CreatePermissionInput>;
};
declare type MutationCreatePlasmidArgs = {
    input?: InputMaybe<CreatePlasmidInput>;
};
declare type MutationCreateRoleArgs = {
    input?: InputMaybe<CreateRoleInput>;
};
declare type MutationCreateRolePermissionRelationshipArgs = {
    permissionId: Scalars['ID'];
    roleId: Scalars['ID'];
};
declare type MutationCreateStrainArgs = {
    input?: InputMaybe<CreateStrainInput>;
};
declare type MutationCreateUserArgs = {
    input?: InputMaybe<CreateUserInput>;
};
declare type MutationCreateUserRoleRelationshipArgs = {
    roleId: Scalars['ID'];
    userId: Scalars['ID'];
};
declare type MutationDeleteContentArgs = {
    id: Scalars['ID'];
};
declare type MutationDeletePermissionArgs = {
    id: Scalars['ID'];
};
declare type MutationDeleteRoleArgs = {
    id: Scalars['ID'];
};
declare type MutationDeleteStockArgs = {
    id: Scalars['ID'];
};
declare type MutationDeleteUserArgs = {
    id: Scalars['ID'];
};
declare type MutationLoginArgs = {
    input?: InputMaybe<LoginInput>;
};
declare type MutationUpdateContentArgs = {
    input?: InputMaybe<UpdateContentInput>;
};
declare type MutationUpdateOrderArgs = {
    id: Scalars['ID'];
    input?: InputMaybe<UpdateOrderInput>;
};
declare type MutationUpdatePermissionArgs = {
    id: Scalars['ID'];
    input?: InputMaybe<UpdatePermissionInput>;
};
declare type MutationUpdatePlasmidArgs = {
    id: Scalars['ID'];
    input?: InputMaybe<UpdatePlasmidInput>;
};
declare type MutationUpdateRoleArgs = {
    id: Scalars['ID'];
    input?: InputMaybe<UpdateRoleInput>;
};
declare type MutationUpdateStrainArgs = {
    id: Scalars['ID'];
    input?: InputMaybe<UpdateStrainInput>;
};
declare type MutationUpdateUserArgs = {
    id: Scalars['ID'];
    input?: InputMaybe<UpdateUserInput>;
};
declare type NameWithLink = {
    __typename?: 'NameWithLink';
    link: Scalars['String'];
    name: Scalars['String'];
};
declare type NumberOfPublicationsWithGene = {
    __typename?: 'NumberOfPublicationsWithGene';
    num_pubs: Scalars['Int'];
    publications: Array<PublicationWithGene>;
};
declare type Order = {
    __typename?: 'Order';
    comments?: Maybe<Scalars['String']>;
    consumer?: Maybe<User>;
    courier?: Maybe<Scalars['String']>;
    courier_account?: Maybe<Scalars['String']>;
    created_at: Scalars['Timestamp'];
    id: Scalars['ID'];
    items?: Maybe<Array<Stock>>;
    payer?: Maybe<User>;
    payment?: Maybe<Scalars['String']>;
    purchase_order_num?: Maybe<Scalars['String']>;
    purchaser?: Maybe<User>;
    status?: Maybe<StatusEnum>;
    updated_at: Scalars['Timestamp'];
};
declare type OrderListWithCursor = {
    __typename?: 'OrderListWithCursor';
    limit?: Maybe<Scalars['Int']>;
    nextCursor: Scalars['Int'];
    orders: Array<Order>;
    previousCursor: Scalars['Int'];
    totalCount: Scalars['Int'];
};
declare type Organism = {
    __typename?: 'Organism';
    citations: Array<Citation>;
    downloads: Array<Download>;
    scientific_name: Scalars['String'];
    taxon_id: Scalars['String'];
};
declare type Orthologs = {
    __typename?: 'Orthologs';
    gene_product: Scalars['String'];
    id: NameWithLink;
    source: Array<Scalars['String']>;
    species: Scalars['String'];
    uniprotkb: NameWithLink;
};
declare type Permission = {
    __typename?: 'Permission';
    created_at: Scalars['Timestamp'];
    description: Scalars['String'];
    id: Scalars['ID'];
    permission: Scalars['String'];
    resource?: Maybe<Scalars['String']>;
    updated_at: Scalars['Timestamp'];
};
declare type Phenotype = {
    __typename?: 'Phenotype';
    assay?: Maybe<Scalars['String']>;
    environment?: Maybe<Scalars['String']>;
    note?: Maybe<Scalars['String']>;
    phenotype: Scalars['String'];
    publication?: Maybe<Publication>;
};
declare type Plasmid = Stock & {
    __typename?: 'Plasmid';
    created_at: Scalars['Timestamp'];
    created_by: User;
    dbxrefs?: Maybe<Array<Scalars['String']>>;
    depositor: User;
    editable_summary?: Maybe<Scalars['String']>;
    genbank_accession?: Maybe<Scalars['String']>;
    genes?: Maybe<Array<Gene>>;
    id: Scalars['ID'];
    image_map?: Maybe<Scalars['String']>;
    in_stock: Scalars['Boolean'];
    keywords?: Maybe<Array<Scalars['String']>>;
    name: Scalars['String'];
    publications?: Maybe<Array<Publication>>;
    sequence?: Maybe<Scalars['String']>;
    summary?: Maybe<Scalars['String']>;
    updated_at: Scalars['Timestamp'];
    updated_by: User;
};
declare type PlasmidListWithCursor = {
    __typename?: 'PlasmidListWithCursor';
    limit?: Maybe<Scalars['Int']>;
    nextCursor: Scalars['Int'];
    plasmids: Array<Plasmid>;
    previousCursor: Scalars['Int'];
    totalCount: Scalars['Int'];
};
declare type ProductInformation = {
    __typename?: 'ProductInformation';
    genomic_coords: Array<GenomicCoordinates>;
    more_protein_data: Scalars['String'];
    protein_coding_gene: NameWithLink;
    protein_length: Scalars['String'];
    protein_molecular_weight: Scalars['String'];
};
declare type ProteinGeneralInfo = {
    __typename?: 'ProteinGeneralInfo';
    aa_composition: NameWithLink;
    description: Scalars['String'];
    dictybase_id: Scalars['String'];
    gene_product: Scalars['String'];
    molecular_weight: Scalars['String'];
    note: Scalars['String'];
    protein_existence: Scalars['String'];
    protein_length: Scalars['String'];
    subcellular_location: Scalars['String'];
};
declare type ProteinInformation = {
    __typename?: 'ProteinInformation';
    external_links: Array<NameWithLink>;
    general_info: ProteinGeneralInfo;
    protein_sequence: Scalars['String'];
};
declare type Publication = BasePublication & {
    __typename?: 'Publication';
    abstract: Scalars['String'];
    authors: Array<Author>;
    doi?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    issn?: Maybe<Scalars['String']>;
    issue?: Maybe<Scalars['String']>;
    journal: Scalars['String'];
    pages?: Maybe<Scalars['String']>;
    pub_date?: Maybe<Scalars['Timestamp']>;
    pub_type: Scalars['String'];
    source: Scalars['String'];
    status?: Maybe<Scalars['String']>;
    title: Scalars['String'];
    volume?: Maybe<Scalars['String']>;
};
declare type PublicationWithGene = BasePublication & {
    __typename?: 'PublicationWithGene';
    abstract: Scalars['String'];
    authors: Array<Author>;
    doi?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    issn?: Maybe<Scalars['String']>;
    issue?: Maybe<Scalars['String']>;
    journal: Scalars['String'];
    pages?: Maybe<Scalars['String']>;
    pub_date?: Maybe<Scalars['Timestamp']>;
    pub_type: Scalars['String'];
    related_genes: Array<Gene>;
    source: Scalars['String'];
    status?: Maybe<Scalars['String']>;
    title: Scalars['String'];
    volume?: Maybe<Scalars['String']>;
};
declare type Query = {
    __typename?: 'Query';
    allOrthologs?: Maybe<Gene>;
    allPublications: NumberOfPublicationsWithGene;
    allStrains?: Maybe<Gene>;
    content?: Maybe<Content>;
    contentBySlug?: Maybe<Content>;
    gene?: Maybe<Gene>;
    generalInformation?: Maybe<Gene>;
    getAssociatedSequnces?: Maybe<Gene>;
    getLinks?: Maybe<Gene>;
    getProteinInformation?: Maybe<Gene>;
    getRefreshToken?: Maybe<Auth>;
    listGeneProductInfo?: Maybe<Gene>;
    listOrders?: Maybe<OrderListWithCursor>;
    listOrganisms?: Maybe<Array<Organism>>;
    listPermissions?: Maybe<Array<Permission>>;
    listPlasmids?: Maybe<PlasmidListWithCursor>;
    listPlasmidsWithAnnotation?: Maybe<PlasmidListWithCursor>;
    listRecentGenes?: Maybe<Array<Gene>>;
    listRecentPlasmids?: Maybe<Array<Plasmid>>;
    listRecentPublications?: Maybe<Array<Publication>>;
    listRecentStrains?: Maybe<Array<Strain>>;
    listRoles?: Maybe<Array<Role>>;
    listStrains?: Maybe<StrainListWithCursor>;
    listStrainsWithAnnotation?: Maybe<StrainListWithCursor>;
    listUsers?: Maybe<UserList>;
    order?: Maybe<Order>;
    organism?: Maybe<Organism>;
    permission?: Maybe<Permission>;
    plasmid?: Maybe<Plasmid>;
    publication?: Maybe<Publication>;
    role?: Maybe<Role>;
    strain?: Maybe<Strain>;
    user?: Maybe<User>;
    userByEmail?: Maybe<User>;
};
declare type QueryAllOrthologsArgs = {
    gene: Scalars['String'];
};
declare type QueryAllPublicationsArgs = {
    gene: Scalars['String'];
    limit?: InputMaybe<Scalars['Int']>;
    sort_by?: InputMaybe<Scalars['String']>;
};
declare type QueryAllStrainsArgs = {
    gene: Scalars['String'];
};
declare type QueryContentArgs = {
    id: Scalars['ID'];
};
declare type QueryContentBySlugArgs = {
    slug: Scalars['String'];
};
declare type QueryGeneArgs = {
    gene: Scalars['String'];
};
declare type QueryGeneralInformationArgs = {
    gene: Scalars['String'];
};
declare type QueryGetAssociatedSequncesArgs = {
    gene: Scalars['String'];
};
declare type QueryGetLinksArgs = {
    gene: Scalars['String'];
};
declare type QueryGetProteinInformationArgs = {
    gene: Scalars['String'];
};
declare type QueryGetRefreshTokenArgs = {
    token: Scalars['String'];
};
declare type QueryListGeneProductInfoArgs = {
    gene: Scalars['String'];
};
declare type QueryListOrdersArgs = {
    cursor?: InputMaybe<Scalars['Int']>;
    filter?: InputMaybe<Scalars['String']>;
    limit?: InputMaybe<Scalars['Int']>;
};
declare type QueryListPlasmidsArgs = {
    cursor?: InputMaybe<Scalars['Int']>;
    filter?: InputMaybe<Scalars['String']>;
    limit?: InputMaybe<Scalars['Int']>;
};
declare type QueryListPlasmidsWithAnnotationArgs = {
    annotation: Scalars['String'];
    cursor?: InputMaybe<Scalars['Int']>;
    limit?: InputMaybe<Scalars['Int']>;
    type: Scalars['String'];
};
declare type QueryListRecentGenesArgs = {
    limit: Scalars['Int'];
};
declare type QueryListRecentPlasmidsArgs = {
    limit: Scalars['Int'];
};
declare type QueryListRecentPublicationsArgs = {
    limit: Scalars['Int'];
};
declare type QueryListRecentStrainsArgs = {
    limit: Scalars['Int'];
};
declare type QueryListStrainsArgs = {
    cursor?: InputMaybe<Scalars['Int']>;
    filter?: InputMaybe<StrainListFilter>;
    limit?: InputMaybe<Scalars['Int']>;
};
declare type QueryListStrainsWithAnnotationArgs = {
    annotation: Scalars['String'];
    cursor?: InputMaybe<Scalars['Int']>;
    limit?: InputMaybe<Scalars['Int']>;
    type: Scalars['String'];
};
declare type QueryListUsersArgs = {
    filter: Scalars['String'];
    pagenum: Scalars['String'];
    pagesize: Scalars['String'];
};
declare type QueryOrderArgs = {
    id: Scalars['ID'];
};
declare type QueryOrganismArgs = {
    taxon_id: Scalars['String'];
};
declare type QueryPermissionArgs = {
    id: Scalars['ID'];
};
declare type QueryPlasmidArgs = {
    id: Scalars['ID'];
};
declare type QueryPublicationArgs = {
    id: Scalars['ID'];
};
declare type QueryRoleArgs = {
    id: Scalars['ID'];
};
declare type QueryStrainArgs = {
    id: Scalars['ID'];
};
declare type QueryUserArgs = {
    id: Scalars['ID'];
};
declare type QueryUserByEmailArgs = {
    email: Scalars['String'];
};
declare type Role = {
    __typename?: 'Role';
    created_at: Scalars['Timestamp'];
    description: Scalars['String'];
    id: Scalars['ID'];
    permissions?: Maybe<Array<Permission>>;
    role: Scalars['String'];
    updated_at: Scalars['Timestamp'];
};
declare enum StatusEnum {
    Cancelled = "CANCELLED",
    Growing = "GROWING",
    InPreparation = "IN_PREPARATION",
    Shipped = "SHIPPED"
}
declare type Stock = {
    created_at: Scalars['Timestamp'];
    created_by: User;
    dbxrefs?: Maybe<Array<Scalars['String']>>;
    depositor: User;
    editable_summary?: Maybe<Scalars['String']>;
    genes?: Maybe<Array<Gene>>;
    id: Scalars['ID'];
    in_stock: Scalars['Boolean'];
    publications?: Maybe<Array<Publication>>;
    summary?: Maybe<Scalars['String']>;
    updated_at: Scalars['Timestamp'];
    updated_by: User;
};
declare type Strain = Stock & {
    __typename?: 'Strain';
    characteristics?: Maybe<Array<Scalars['String']>>;
    created_at: Scalars['Timestamp'];
    created_by: User;
    dbxrefs?: Maybe<Array<Scalars['String']>>;
    depositor: User;
    editable_summary?: Maybe<Scalars['String']>;
    genes?: Maybe<Array<Gene>>;
    genetic_modification?: Maybe<Scalars['String']>;
    genotypes?: Maybe<Array<Scalars['String']>>;
    id: Scalars['ID'];
    in_stock: Scalars['Boolean'];
    label: Scalars['String'];
    mutagenesis_method?: Maybe<Scalars['String']>;
    names?: Maybe<Array<Scalars['String']>>;
    parent?: Maybe<Strain>;
    phenotypes?: Maybe<Array<Phenotype>>;
    plasmid?: Maybe<Scalars['String']>;
    publications?: Maybe<Array<Publication>>;
    species: Scalars['String'];
    summary?: Maybe<Scalars['String']>;
    systematic_name: Scalars['String'];
    updated_at: Scalars['Timestamp'];
    updated_by: User;
};
declare type StrainListFilter = {
    id?: InputMaybe<Scalars['ID']>;
    in_stock?: InputMaybe<Scalars['Boolean']>;
    label?: InputMaybe<Scalars['String']>;
    strain_type: StrainType;
    summary?: InputMaybe<Scalars['String']>;
};
declare type StrainListWithCursor = {
    __typename?: 'StrainListWithCursor';
    limit?: Maybe<Scalars['Int']>;
    nextCursor: Scalars['Int'];
    previousCursor: Scalars['Int'];
    strains: Array<Strain>;
    totalCount: Scalars['Int'];
};
declare enum StrainType {
    All = "ALL",
    Bacterial = "BACTERIAL",
    Gwdi = "GWDI",
    Regular = "REGULAR"
}
declare type UpdateContentInput = {
    content: Scalars['String'];
    id: Scalars['ID'];
    updated_by: Scalars['String'];
};
declare type UpdateOrderInput = {
    comments?: InputMaybe<Scalars['String']>;
    courier?: InputMaybe<Scalars['String']>;
    courier_account?: InputMaybe<Scalars['String']>;
    items?: InputMaybe<Array<Scalars['String']>>;
    payment?: InputMaybe<Scalars['String']>;
    purchase_order_num?: InputMaybe<Scalars['String']>;
    status?: InputMaybe<StatusEnum>;
};
declare type UpdatePermissionInput = {
    description: Scalars['String'];
    permission: Scalars['String'];
    resource: Scalars['String'];
};
declare type UpdatePlasmidInput = {
    dbxrefs?: InputMaybe<Array<Scalars['String']>>;
    depositor?: InputMaybe<Scalars['String']>;
    editable_summary?: InputMaybe<Scalars['String']>;
    genbank_accession?: InputMaybe<Scalars['String']>;
    genes?: InputMaybe<Array<Scalars['String']>>;
    image_map?: InputMaybe<Scalars['String']>;
    in_stock?: InputMaybe<Scalars['Boolean']>;
    keywords?: InputMaybe<Array<Scalars['String']>>;
    name?: InputMaybe<Scalars['String']>;
    publications?: InputMaybe<Array<Scalars['String']>>;
    sequence?: InputMaybe<Scalars['String']>;
    summary?: InputMaybe<Scalars['String']>;
    updated_by: Scalars['String'];
};
declare type UpdateRoleInput = {
    description: Scalars['String'];
    role: Scalars['String'];
};
declare type UpdateStrainInput = {
    characteristics?: InputMaybe<Array<Scalars['String']>>;
    dbxrefs?: InputMaybe<Array<Scalars['String']>>;
    depositor?: InputMaybe<Scalars['String']>;
    editable_summary?: InputMaybe<Scalars['String']>;
    genes?: InputMaybe<Array<Scalars['String']>>;
    genetic_modification?: InputMaybe<Scalars['String']>;
    genotypes?: InputMaybe<Array<Scalars['String']>>;
    in_stock?: InputMaybe<Scalars['Boolean']>;
    label?: InputMaybe<Scalars['String']>;
    mutagenesis_method?: InputMaybe<Scalars['String']>;
    names?: InputMaybe<Array<Scalars['String']>>;
    parent?: InputMaybe<Scalars['String']>;
    phenotypes?: InputMaybe<Array<Scalars['String']>>;
    plasmid?: InputMaybe<Scalars['String']>;
    publications?: InputMaybe<Array<Scalars['String']>>;
    species?: InputMaybe<Scalars['String']>;
    summary?: InputMaybe<Scalars['String']>;
    systematic_name?: InputMaybe<Scalars['String']>;
    updated_by: Scalars['String'];
};
declare type UpdateUserInput = {
    city?: InputMaybe<Scalars['String']>;
    country?: InputMaybe<Scalars['String']>;
    first_address?: InputMaybe<Scalars['String']>;
    first_name?: InputMaybe<Scalars['String']>;
    group_name?: InputMaybe<Scalars['String']>;
    is_active?: InputMaybe<Scalars['Boolean']>;
    last_name?: InputMaybe<Scalars['String']>;
    organization?: InputMaybe<Scalars['String']>;
    phone?: InputMaybe<Scalars['String']>;
    second_address?: InputMaybe<Scalars['String']>;
    state?: InputMaybe<Scalars['String']>;
    zipcode?: InputMaybe<Scalars['String']>;
};
declare type User = {
    __typename?: 'User';
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    created_at: Scalars['Timestamp'];
    email: Scalars['String'];
    first_address?: Maybe<Scalars['String']>;
    first_name: Scalars['String'];
    group_name?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    is_active: Scalars['Boolean'];
    last_name: Scalars['String'];
    organization?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    roles?: Maybe<Array<Role>>;
    second_address?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    updated_at: Scalars['Timestamp'];
    zipcode?: Maybe<Scalars['String']>;
};
declare type UserList = {
    __typename?: 'UserList';
    pageNum?: Maybe<Scalars['String']>;
    pageSize?: Maybe<Scalars['String']>;
    totalCount: Scalars['Int'];
    users: Array<User>;
};
declare type With = {
    __typename?: 'With';
    db: Scalars['String'];
    id: Scalars['String'];
    name: Scalars['String'];
};
declare type LoginMutationVariables = Exact<{
    input: LoginInput;
}>;
declare type LoginMutation = {
    __typename?: 'Mutation';
    login?: {
        __typename?: 'Auth';
        token: string;
        user: {
            __typename?: 'User';
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            roles?: Array<{
                __typename?: 'Role';
                role: string;
                permissions?: Array<{
                    __typename?: 'Permission';
                    permission: string;
                    resource?: string | null;
                }> | null;
            }> | null;
        };
        identity: {
            __typename?: 'Identity';
            provider: string;
        };
    } | null;
};
declare type LogoutMutationVariables = Exact<{
    [key: string]: never;
}>;
declare type LogoutMutation = {
    __typename?: 'Mutation';
    logout?: {
        __typename?: 'Logout';
        success: boolean;
    } | null;
};
declare type CreateContentMutationVariables = Exact<{
    input: CreateContentInput;
}>;
declare type CreateContentMutation = {
    __typename?: 'Mutation';
    createContent?: {
        __typename?: 'Content';
        name: string;
        content: string;
        namespace: string;
        created_by: {
            __typename?: 'User';
            id: string;
        };
    } | null;
};
declare type UpdateContentMutationVariables = Exact<{
    input: UpdateContentInput;
}>;
declare type UpdateContentMutation = {
    __typename?: 'Mutation';
    updateContent?: {
        __typename?: 'Content';
        id: string;
        content: string;
        updated_by: {
            __typename?: 'User';
            id: string;
        };
    } | null;
};
declare type CreateOrderMutationVariables = Exact<{
    input: CreateOrderInput;
}>;
declare type CreateOrderMutation = {
    __typename?: 'Mutation';
    createOrder?: {
        __typename?: 'Order';
        id: string;
    } | null;
};
declare type CreateUserMutationVariables = Exact<{
    input: CreateUserInput;
}>;
declare type CreateUserMutation = {
    __typename?: 'Mutation';
    createUser?: {
        __typename?: 'User';
        id: string;
    } | null;
};
declare type UpdateUserMutationVariables = Exact<{
    id: Scalars['ID'];
    input: UpdateUserInput;
}>;
declare type UpdateUserMutation = {
    __typename?: 'Mutation';
    updateUser?: {
        __typename?: 'User';
        id: string;
    } | null;
};
declare type GetRefreshTokenQueryVariables = Exact<{
    token: Scalars['String'];
}>;
declare type GetRefreshTokenQuery = {
    __typename?: 'Query';
    getRefreshToken?: {
        __typename?: 'Auth';
        token: string;
        user: {
            __typename?: 'User';
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            roles?: Array<{
                __typename?: 'Role';
                role: string;
                permissions?: Array<{
                    __typename?: 'Permission';
                    permission: string;
                    resource?: string | null;
                }> | null;
            }> | null;
        };
        identity: {
            __typename?: 'Identity';
            provider: string;
        };
    } | null;
};
declare type ContentBySlugQueryVariables = Exact<{
    slug: Scalars['String'];
}>;
declare type ContentBySlugQuery = {
    __typename?: 'Query';
    contentBySlug?: {
        __typename?: 'Content';
        id: string;
        content: string;
        name: string;
        slug: string;
        updated_at: any;
        updated_by: {
            __typename?: 'User';
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            roles?: Array<{
                __typename?: 'Role';
                role: string;
                permissions?: Array<{
                    __typename?: 'Permission';
                    permission: string;
                    resource?: string | null;
                }> | null;
            }> | null;
        };
    } | null;
};
declare type ContentQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
declare type ContentQuery = {
    __typename?: 'Query';
    content?: {
        __typename?: 'Content';
        id: string;
        content: string;
        name: string;
        slug: string;
        namespace: string;
        updated_at: any;
        updated_by: {
            __typename?: 'User';
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            roles?: Array<{
                __typename?: 'Role';
                role: string;
                permissions?: Array<{
                    __typename?: 'Permission';
                    permission: string;
                    resource?: string | null;
                }> | null;
            }> | null;
        };
    } | null;
};
declare type ListOrganismsQueryVariables = Exact<{
    [key: string]: never;
}>;
declare type ListOrganismsQuery = {
    __typename?: 'Query';
    listOrganisms?: Array<{
        __typename?: 'Organism';
        taxon_id: string;
        scientific_name: string;
        citations: Array<{
            __typename?: 'Citation';
            title: string;
            authors: string;
            pubmed_id: string;
            journal: string;
        }>;
        downloads: Array<{
            __typename?: 'Download';
            title: string;
            items: Array<{
                __typename?: 'DownloadItem';
                title: string;
                url: string;
            }>;
        }>;
    }> | null;
};
declare type GeneQueryVariables = Exact<{
    gene: Scalars['String'];
    limit?: InputMaybe<Scalars['Int']>;
    sort_by?: InputMaybe<Scalars['String']>;
}>;
declare type GeneQuery = {
    __typename?: 'Query';
    allStrains?: {
        __typename?: 'Gene';
        id: string;
        name: string;
        strains?: Array<{
            __typename?: 'Strain';
            id: string;
            label: string;
            characteristics?: Array<string> | null;
            in_stock: boolean;
            phenotypes?: Array<{
                __typename?: 'Phenotype';
                phenotype: string;
                publication?: {
                    __typename?: 'Publication';
                    id: string;
                    title: string;
                    journal: string;
                    pages?: string | null;
                    volume?: string | null;
                    pub_date?: any | null;
                    authors: Array<{
                        __typename?: 'Author';
                        last_name: string;
                        rank?: string | null;
                    }>;
                } | null;
            }> | null;
        }> | null;
    } | null;
    gene?: {
        __typename?: 'Gene';
        id: string;
        name: string;
        goas?: Array<{
            __typename?: 'GOAnnotation';
            id: string;
            type: string;
            date: string;
            evidence_code: string;
            go_term: string;
            qualifier: string;
            publication: string;
            assigned_by: string;
            with?: Array<{
                __typename?: 'With';
                id: string;
                db: string;
                name: string;
            }> | null;
            extensions?: Array<{
                __typename?: 'Extension';
                id: string;
                db: string;
                relation: string;
                name: string;
            }> | null;
        }> | null;
    } | null;
    allPublications: {
        __typename?: 'NumberOfPublicationsWithGene';
        num_pubs: number;
        publications: Array<{
            __typename?: 'PublicationWithGene';
            id: string;
            doi?: string | null;
            title: string;
            journal: string;
            pub_date?: any | null;
            volume?: string | null;
            pages?: string | null;
            pub_type: string;
            source: string;
            issue?: string | null;
            related_genes: Array<{
                __typename?: 'Gene';
                id: string;
                name: string;
            }>;
            authors: Array<{
                __typename?: 'Author';
                last_name: string;
                rank?: string | null;
            }>;
        }>;
    };
    allOrthologs?: {
        __typename?: 'Gene';
        id: string;
        name: string;
        orthologs?: Array<{
            __typename?: 'Orthologs';
            species: string;
            gene_product: string;
            source: Array<string>;
            id: {
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            };
            uniprotkb: {
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            };
        }> | null;
    } | null;
    listGeneProductInfo?: {
        __typename?: 'Gene';
        id: string;
        name: string;
        product_info?: Array<{
            __typename?: 'ProductInformation';
            protein_length: string;
            protein_molecular_weight: string;
            more_protein_data: string;
            protein_coding_gene: {
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            };
            genomic_coords: Array<{
                __typename?: 'GenomicCoordinates';
                exon: string;
                local_coords: string;
                chrom_coords: string;
            }>;
        }> | null;
    } | null;
    generalInformation?: {
        __typename?: 'Gene';
        id: string;
        name: string;
        general_info: {
            __typename?: 'GeneralInfo';
            name_description: Array<string>;
            alt_gene_name?: Array<string> | null;
            gene_product: string;
            alt_protein_names?: Array<string> | null;
            description: string;
        };
    } | null;
    getAssociatedSequnces?: {
        __typename?: 'Gene';
        id: string;
        name: string;
        associated_sequences: {
            __typename?: 'AssociatedSequences';
            more_link: string;
            genbank_genomic_fragment?: {
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            } | null;
            genbank_mrna?: {
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            } | null;
            ests: Array<{
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            }>;
        };
    } | null;
    getLinks?: {
        __typename?: 'Gene';
        id: string;
        name: string;
        links: {
            __typename?: 'Links';
            expression: Array<{
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            }>;
            colleagues: {
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            };
            ext_resources: Array<{
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            }>;
        };
    } | null;
    getProteinInformation?: {
        __typename?: 'Gene';
        id: string;
        name: string;
        protein_information?: {
            __typename?: 'ProteinInformation';
            protein_sequence: string;
            general_info: {
                __typename?: 'ProteinGeneralInfo';
                gene_product: string;
                dictybase_id: string;
                description: string;
                protein_length: string;
                molecular_weight: string;
                subcellular_location: string;
                protein_existence: string;
                note: string;
                aa_composition: {
                    __typename?: 'NameWithLink';
                    name: string;
                    link: string;
                };
            };
            external_links: Array<{
                __typename?: 'NameWithLink';
                name: string;
                link: string;
            }>;
        } | null;
    } | null;
};
declare type ListRecentGenesQueryVariables = Exact<{
    limit?: Scalars['Int'];
}>;
declare type ListRecentGenesQuery = {
    __typename?: 'Query';
    listRecentGenes?: Array<{
        __typename?: 'Gene';
        id: string;
        name: string;
    }> | null;
};
declare type PublicationQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
declare type PublicationQuery = {
    __typename?: 'Query';
    publication?: {
        __typename?: 'Publication';
        id: string;
        doi?: string | null;
        title: string;
        abstract: string;
        journal: string;
        pub_date?: any | null;
        pages?: string | null;
        issue?: string | null;
        volume?: string | null;
        authors: Array<{
            __typename?: 'Author';
            initials?: string | null;
            last_name: string;
        }>;
    } | null;
};
declare type ListRecentPublicationsQueryVariables = Exact<{
    limit?: Scalars['Int'];
}>;
declare type ListRecentPublicationsQuery = {
    __typename?: 'Query';
    listRecentPublications?: Array<{
        __typename?: 'Publication';
        id: string;
        doi?: string | null;
        title: string;
        abstract: string;
        journal: string;
        pub_date?: any | null;
        pages?: string | null;
        issue?: string | null;
        volume?: string | null;
        authors: Array<{
            __typename?: 'Author';
            initials?: string | null;
            last_name: string;
        }>;
    }> | null;
};
declare type StrainListQueryVariables = Exact<{
    cursor: Scalars['Int'];
    limit: Scalars['Int'];
    filter?: InputMaybe<StrainListFilter>;
}>;
declare type StrainListQuery = {
    __typename?: 'Query';
    listStrains?: {
        __typename?: 'StrainListWithCursor';
        nextCursor: number;
        totalCount: number;
        strains: Array<{
            __typename?: 'Strain';
            id: string;
            label: string;
            summary?: string | null;
            in_stock: boolean;
        }>;
    } | null;
};
declare type ListStrainsWithPhenotypeQueryVariables = Exact<{
    cursor: Scalars['Int'];
    limit: Scalars['Int'];
    type: Scalars['String'];
    annotation: Scalars['String'];
}>;
declare type ListStrainsWithPhenotypeQuery = {
    __typename?: 'Query';
    listStrainsWithAnnotation?: {
        __typename?: 'StrainListWithCursor';
        totalCount: number;
        nextCursor: number;
        strains: Array<{
            __typename?: 'Strain';
            id: string;
            label: string;
            genes?: Array<{
                __typename?: 'Gene';
                name: string;
            }> | null;
            publications?: Array<{
                __typename?: 'Publication';
                id: string;
                pub_date?: any | null;
                title: string;
                journal: string;
                volume?: string | null;
                pages?: string | null;
                authors: Array<{
                    __typename?: 'Author';
                    last_name: string;
                }>;
            }> | null;
        }>;
    } | null;
};
declare type ListBacterialStrainsQueryVariables = Exact<{
    [key: string]: never;
}>;
declare type ListBacterialStrainsQuery = {
    __typename?: 'Query';
    bacterialFoodSource?: {
        __typename?: 'StrainListWithCursor';
        totalCount: number;
        nextCursor: number;
        strains: Array<{
            __typename?: 'Strain';
            id: string;
            label: string;
            summary?: string | null;
            in_stock: boolean;
        }>;
    } | null;
    symbioticFarmerBacterium?: {
        __typename?: 'StrainListWithCursor';
        totalCount: number;
        nextCursor: number;
        strains: Array<{
            __typename?: 'Strain';
            id: string;
            label: string;
            summary?: string | null;
            in_stock: boolean;
        }>;
    } | null;
};
declare type ListStrainsInventoryQueryVariables = Exact<{
    cursor: Scalars['Int'];
    limit: Scalars['Int'];
}>;
declare type ListStrainsInventoryQuery = {
    __typename?: 'Query';
    listStrainsWithAnnotation?: {
        __typename?: 'StrainListWithCursor';
        totalCount: number;
        nextCursor: number;
        strains: Array<{
            __typename?: 'Strain';
            id: string;
            label: string;
            summary?: string | null;
            in_stock: boolean;
        }>;
    } | null;
};
declare type ListPlasmidsInventoryQueryVariables = Exact<{
    cursor: Scalars['Int'];
    limit: Scalars['Int'];
}>;
declare type ListPlasmidsInventoryQuery = {
    __typename?: 'Query';
    listPlasmidsWithAnnotation?: {
        __typename?: 'PlasmidListWithCursor';
        totalCount: number;
        nextCursor: number;
        plasmids: Array<{
            __typename?: 'Plasmid';
            id: string;
            name: string;
            summary?: string | null;
            in_stock: boolean;
        }>;
    } | null;
};
declare type PlasmidListFilterQueryVariables = Exact<{
    cursor: Scalars['Int'];
    limit: Scalars['Int'];
    filter: Scalars['String'];
}>;
declare type PlasmidListFilterQuery = {
    __typename?: 'Query';
    listPlasmids?: {
        __typename?: 'PlasmidListWithCursor';
        nextCursor: number;
        totalCount: number;
        plasmids: Array<{
            __typename?: 'Plasmid';
            id: string;
            name: string;
            summary?: string | null;
            in_stock: boolean;
        }>;
    } | null;
};
declare type PlasmidQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
declare type PlasmidQuery = {
    __typename?: 'Query';
    plasmid?: {
        __typename?: 'Plasmid';
        id: string;
        name: string;
        summary?: string | null;
        dbxrefs?: Array<string> | null;
        image_map?: string | null;
        sequence?: string | null;
        keywords?: Array<string> | null;
        genbank_accession?: string | null;
        in_stock: boolean;
        depositor: {
            __typename?: 'User';
            first_name: string;
            last_name: string;
        };
        publications?: Array<{
            __typename?: 'Publication';
            id: string;
            pub_date?: any | null;
            title: string;
            journal: string;
            volume?: string | null;
            pages?: string | null;
            doi?: string | null;
            authors: Array<{
                __typename?: 'Author';
                last_name: string;
            }>;
        }> | null;
        genes?: Array<{
            __typename?: 'Gene';
            name: string;
        }> | null;
    } | null;
};
declare type StrainQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
declare type StrainQuery = {
    __typename?: 'Query';
    strain?: {
        __typename?: 'Strain';
        id: string;
        label: string;
        summary?: string | null;
        species: string;
        plasmid?: string | null;
        dbxrefs?: Array<string> | null;
        in_stock: boolean;
        systematic_name: string;
        genotypes?: Array<string> | null;
        mutagenesis_method?: string | null;
        genetic_modification?: string | null;
        names?: Array<string> | null;
        characteristics?: Array<string> | null;
        parent?: {
            __typename?: 'Strain';
            id: string;
            label: string;
        } | null;
        depositor: {
            __typename?: 'User';
            first_name: string;
            last_name: string;
        };
        publications?: Array<{
            __typename?: 'Publication';
            id: string;
            pub_date?: any | null;
            title: string;
            journal: string;
            volume?: string | null;
            pages?: string | null;
            doi?: string | null;
            authors: Array<{
                __typename?: 'Author';
                last_name: string;
            }>;
        }> | null;
        genes?: Array<{
            __typename?: 'Gene';
            name: string;
        }> | null;
        phenotypes?: Array<{
            __typename?: 'Phenotype';
            phenotype: string;
            note?: string | null;
            assay?: string | null;
            environment?: string | null;
            publication?: {
                __typename?: 'Publication';
                id: string;
                pub_date?: any | null;
                title: string;
                journal: string;
                volume?: string | null;
                pages?: string | null;
                authors: Array<{
                    __typename?: 'Author';
                    last_name: string;
                }>;
            } | null;
        }> | null;
    } | null;
};
declare type ListRecentPlasmidsQueryVariables = Exact<{
    limit?: Scalars['Int'];
}>;
declare type ListRecentPlasmidsQuery = {
    __typename?: 'Query';
    listRecentPlasmids?: Array<{
        __typename?: 'Plasmid';
        id: string;
        created_at: any;
        name: string;
    }> | null;
};
declare type ListRecentStrainsQueryVariables = Exact<{
    limit?: Scalars['Int'];
}>;
declare type ListRecentStrainsQuery = {
    __typename?: 'Query';
    listRecentStrains?: Array<{
        __typename?: 'Strain';
        id: string;
        created_at: any;
        systematic_name: string;
    }> | null;
};
declare type UserByEmailQueryVariables = Exact<{
    email: Scalars['String'];
}>;
declare type UserByEmailQuery = {
    __typename?: 'Query';
    userByEmail?: {
        __typename?: 'User';
        id: string;
    } | null;
};
declare const LoginDocument: Apollo.DocumentNode;
declare type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
declare function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>): Apollo.MutationTuple<LoginMutation, Exact<{
    input: LoginInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
declare type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
declare type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
declare type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
declare const LogoutDocument: Apollo.DocumentNode;
declare type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;
/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
declare function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>): Apollo.MutationTuple<LogoutMutation, Exact<{
    [key: string]: never;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
declare type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
declare type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
declare type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
declare const CreateContentDocument: Apollo.DocumentNode;
declare type CreateContentMutationFn = Apollo.MutationFunction<CreateContentMutation, CreateContentMutationVariables>;
/**
 * __useCreateContentMutation__
 *
 * To run a mutation, you first call `useCreateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentMutation, { data, loading, error }] = useCreateContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
declare function useCreateContentMutation(baseOptions?: Apollo.MutationHookOptions<CreateContentMutation, CreateContentMutationVariables>): Apollo.MutationTuple<CreateContentMutation, Exact<{
    input: CreateContentInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
declare type CreateContentMutationHookResult = ReturnType<typeof useCreateContentMutation>;
declare type CreateContentMutationResult = Apollo.MutationResult<CreateContentMutation>;
declare type CreateContentMutationOptions = Apollo.BaseMutationOptions<CreateContentMutation, CreateContentMutationVariables>;
declare const UpdateContentDocument: Apollo.DocumentNode;
declare type UpdateContentMutationFn = Apollo.MutationFunction<UpdateContentMutation, UpdateContentMutationVariables>;
/**
 * __useUpdateContentMutation__
 *
 * To run a mutation, you first call `useUpdateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentMutation, { data, loading, error }] = useUpdateContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
declare function useUpdateContentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContentMutation, UpdateContentMutationVariables>): Apollo.MutationTuple<UpdateContentMutation, Exact<{
    input: UpdateContentInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
declare type UpdateContentMutationHookResult = ReturnType<typeof useUpdateContentMutation>;
declare type UpdateContentMutationResult = Apollo.MutationResult<UpdateContentMutation>;
declare type UpdateContentMutationOptions = Apollo.BaseMutationOptions<UpdateContentMutation, UpdateContentMutationVariables>;
declare const CreateOrderDocument: Apollo.DocumentNode;
declare type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;
/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
declare function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>): Apollo.MutationTuple<CreateOrderMutation, Exact<{
    input: CreateOrderInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
declare type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
declare type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
declare type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
declare const CreateUserDocument: Apollo.DocumentNode;
declare type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
declare function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>): Apollo.MutationTuple<CreateUserMutation, Exact<{
    input: CreateUserInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
declare type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
declare type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
declare type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
declare const UpdateUserDocument: Apollo.DocumentNode;
declare type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
declare function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>): Apollo.MutationTuple<UpdateUserMutation, Exact<{
    id: string;
    input: UpdateUserInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
declare type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
declare type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
declare type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
declare const GetRefreshTokenDocument: Apollo.DocumentNode;
/**
 * __useGetRefreshTokenQuery__
 *
 * To run a query within a React component, call `useGetRefreshTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRefreshTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRefreshTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
declare function useGetRefreshTokenQuery(baseOptions: Apollo.QueryHookOptions<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>): Apollo.QueryResult<GetRefreshTokenQuery, Exact<{
    token: string;
}>>;
declare function useGetRefreshTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>): Apollo.LazyQueryResultTuple<GetRefreshTokenQuery, Exact<{
    token: string;
}>>;
declare type GetRefreshTokenQueryHookResult = ReturnType<typeof useGetRefreshTokenQuery>;
declare type GetRefreshTokenLazyQueryHookResult = ReturnType<typeof useGetRefreshTokenLazyQuery>;
declare type GetRefreshTokenQueryResult = Apollo.QueryResult<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>;
declare const ContentBySlugDocument: Apollo.DocumentNode;
/**
 * __useContentBySlugQuery__
 *
 * To run a query within a React component, call `useContentBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
declare function useContentBySlugQuery(baseOptions: Apollo.QueryHookOptions<ContentBySlugQuery, ContentBySlugQueryVariables>): Apollo.QueryResult<ContentBySlugQuery, Exact<{
    slug: string;
}>>;
declare function useContentBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentBySlugQuery, ContentBySlugQueryVariables>): Apollo.LazyQueryResultTuple<ContentBySlugQuery, Exact<{
    slug: string;
}>>;
declare type ContentBySlugQueryHookResult = ReturnType<typeof useContentBySlugQuery>;
declare type ContentBySlugLazyQueryHookResult = ReturnType<typeof useContentBySlugLazyQuery>;
declare type ContentBySlugQueryResult = Apollo.QueryResult<ContentBySlugQuery, ContentBySlugQueryVariables>;
declare const ContentDocument: Apollo.DocumentNode;
/**
 * __useContentQuery__
 *
 * To run a query within a React component, call `useContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
declare function useContentQuery(baseOptions: Apollo.QueryHookOptions<ContentQuery, ContentQueryVariables>): Apollo.QueryResult<ContentQuery, Exact<{
    id: string;
}>>;
declare function useContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentQuery, ContentQueryVariables>): Apollo.LazyQueryResultTuple<ContentQuery, Exact<{
    id: string;
}>>;
declare type ContentQueryHookResult = ReturnType<typeof useContentQuery>;
declare type ContentLazyQueryHookResult = ReturnType<typeof useContentLazyQuery>;
declare type ContentQueryResult = Apollo.QueryResult<ContentQuery, ContentQueryVariables>;
declare const ListOrganismsDocument: Apollo.DocumentNode;
/**
 * __useListOrganismsQuery__
 *
 * To run a query within a React component, call `useListOrganismsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOrganismsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOrganismsQuery({
 *   variables: {
 *   },
 * });
 */
declare function useListOrganismsQuery(baseOptions?: Apollo.QueryHookOptions<ListOrganismsQuery, ListOrganismsQueryVariables>): Apollo.QueryResult<ListOrganismsQuery, Exact<{
    [key: string]: never;
}>>;
declare function useListOrganismsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOrganismsQuery, ListOrganismsQueryVariables>): Apollo.LazyQueryResultTuple<ListOrganismsQuery, Exact<{
    [key: string]: never;
}>>;
declare type ListOrganismsQueryHookResult = ReturnType<typeof useListOrganismsQuery>;
declare type ListOrganismsLazyQueryHookResult = ReturnType<typeof useListOrganismsLazyQuery>;
declare type ListOrganismsQueryResult = Apollo.QueryResult<ListOrganismsQuery, ListOrganismsQueryVariables>;
declare const GeneDocument: Apollo.DocumentNode;
/**
 * __useGeneQuery__
 *
 * To run a query within a React component, call `useGeneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneQuery({
 *   variables: {
 *      gene: // value for 'gene'
 *      limit: // value for 'limit'
 *      sort_by: // value for 'sort_by'
 *   },
 * });
 */
declare function useGeneQuery(baseOptions: Apollo.QueryHookOptions<GeneQuery, GeneQueryVariables>): Apollo.QueryResult<GeneQuery, Exact<{
    gene: string;
    limit?: InputMaybe<number> | undefined;
    sort_by?: InputMaybe<string> | undefined;
}>>;
declare function useGeneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneQuery, GeneQueryVariables>): Apollo.LazyQueryResultTuple<GeneQuery, Exact<{
    gene: string;
    limit?: InputMaybe<number> | undefined;
    sort_by?: InputMaybe<string> | undefined;
}>>;
declare type GeneQueryHookResult = ReturnType<typeof useGeneQuery>;
declare type GeneLazyQueryHookResult = ReturnType<typeof useGeneLazyQuery>;
declare type GeneQueryResult = Apollo.QueryResult<GeneQuery, GeneQueryVariables>;
declare const ListRecentGenesDocument: Apollo.DocumentNode;
/**
 * __useListRecentGenesQuery__
 *
 * To run a query within a React component, call `useListRecentGenesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRecentGenesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRecentGenesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
declare function useListRecentGenesQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentGenesQuery, ListRecentGenesQueryVariables>): Apollo.QueryResult<ListRecentGenesQuery, Exact<{
    limit?: number | undefined;
}>>;
declare function useListRecentGenesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentGenesQuery, ListRecentGenesQueryVariables>): Apollo.LazyQueryResultTuple<ListRecentGenesQuery, Exact<{
    limit?: number | undefined;
}>>;
declare type ListRecentGenesQueryHookResult = ReturnType<typeof useListRecentGenesQuery>;
declare type ListRecentGenesLazyQueryHookResult = ReturnType<typeof useListRecentGenesLazyQuery>;
declare type ListRecentGenesQueryResult = Apollo.QueryResult<ListRecentGenesQuery, ListRecentGenesQueryVariables>;
declare const PublicationDocument: Apollo.DocumentNode;
/**
 * __usePublicationQuery__
 *
 * To run a query within a React component, call `usePublicationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
declare function usePublicationQuery(baseOptions: Apollo.QueryHookOptions<PublicationQuery, PublicationQueryVariables>): Apollo.QueryResult<PublicationQuery, Exact<{
    id: string;
}>>;
declare function usePublicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationQuery, PublicationQueryVariables>): Apollo.LazyQueryResultTuple<PublicationQuery, Exact<{
    id: string;
}>>;
declare type PublicationQueryHookResult = ReturnType<typeof usePublicationQuery>;
declare type PublicationLazyQueryHookResult = ReturnType<typeof usePublicationLazyQuery>;
declare type PublicationQueryResult = Apollo.QueryResult<PublicationQuery, PublicationQueryVariables>;
declare const ListRecentPublicationsDocument: Apollo.DocumentNode;
/**
 * __useListRecentPublicationsQuery__
 *
 * To run a query within a React component, call `useListRecentPublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRecentPublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRecentPublicationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
declare function useListRecentPublicationsQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>): Apollo.QueryResult<ListRecentPublicationsQuery, Exact<{
    limit?: number | undefined;
}>>;
declare function useListRecentPublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>): Apollo.LazyQueryResultTuple<ListRecentPublicationsQuery, Exact<{
    limit?: number | undefined;
}>>;
declare type ListRecentPublicationsQueryHookResult = ReturnType<typeof useListRecentPublicationsQuery>;
declare type ListRecentPublicationsLazyQueryHookResult = ReturnType<typeof useListRecentPublicationsLazyQuery>;
declare type ListRecentPublicationsQueryResult = Apollo.QueryResult<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>;
declare const StrainListDocument: Apollo.DocumentNode;
/**
 * __useStrainListQuery__
 *
 * To run a query within a React component, call `useStrainListQuery` and pass it any options that fit your needs.
 * When your component renders, `useStrainListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStrainListQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      filter: // value for 'filter'
 *   },
 * });
 */
declare function useStrainListQuery(baseOptions: Apollo.QueryHookOptions<StrainListQuery, StrainListQueryVariables>): Apollo.QueryResult<StrainListQuery, Exact<{
    cursor: number;
    limit: number;
    filter?: InputMaybe<StrainListFilter> | undefined;
}>>;
declare function useStrainListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StrainListQuery, StrainListQueryVariables>): Apollo.LazyQueryResultTuple<StrainListQuery, Exact<{
    cursor: number;
    limit: number;
    filter?: InputMaybe<StrainListFilter> | undefined;
}>>;
declare type StrainListQueryHookResult = ReturnType<typeof useStrainListQuery>;
declare type StrainListLazyQueryHookResult = ReturnType<typeof useStrainListLazyQuery>;
declare type StrainListQueryResult = Apollo.QueryResult<StrainListQuery, StrainListQueryVariables>;
declare const ListStrainsWithPhenotypeDocument: Apollo.DocumentNode;
/**
 * __useListStrainsWithPhenotypeQuery__
 *
 * To run a query within a React component, call `useListStrainsWithPhenotypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useListStrainsWithPhenotypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListStrainsWithPhenotypeQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      type: // value for 'type'
 *      annotation: // value for 'annotation'
 *   },
 * });
 */
declare function useListStrainsWithPhenotypeQuery(baseOptions: Apollo.QueryHookOptions<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>): Apollo.QueryResult<ListStrainsWithPhenotypeQuery, Exact<{
    cursor: number;
    limit: number;
    type: string;
    annotation: string;
}>>;
declare function useListStrainsWithPhenotypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>): Apollo.LazyQueryResultTuple<ListStrainsWithPhenotypeQuery, Exact<{
    cursor: number;
    limit: number;
    type: string;
    annotation: string;
}>>;
declare type ListStrainsWithPhenotypeQueryHookResult = ReturnType<typeof useListStrainsWithPhenotypeQuery>;
declare type ListStrainsWithPhenotypeLazyQueryHookResult = ReturnType<typeof useListStrainsWithPhenotypeLazyQuery>;
declare type ListStrainsWithPhenotypeQueryResult = Apollo.QueryResult<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>;
declare const ListBacterialStrainsDocument: Apollo.DocumentNode;
/**
 * __useListBacterialStrainsQuery__
 *
 * To run a query within a React component, call `useListBacterialStrainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBacterialStrainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBacterialStrainsQuery({
 *   variables: {
 *   },
 * });
 */
declare function useListBacterialStrainsQuery(baseOptions?: Apollo.QueryHookOptions<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>): Apollo.QueryResult<ListBacterialStrainsQuery, Exact<{
    [key: string]: never;
}>>;
declare function useListBacterialStrainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>): Apollo.LazyQueryResultTuple<ListBacterialStrainsQuery, Exact<{
    [key: string]: never;
}>>;
declare type ListBacterialStrainsQueryHookResult = ReturnType<typeof useListBacterialStrainsQuery>;
declare type ListBacterialStrainsLazyQueryHookResult = ReturnType<typeof useListBacterialStrainsLazyQuery>;
declare type ListBacterialStrainsQueryResult = Apollo.QueryResult<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>;
declare const ListStrainsInventoryDocument: Apollo.DocumentNode;
/**
 * __useListStrainsInventoryQuery__
 *
 * To run a query within a React component, call `useListStrainsInventoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useListStrainsInventoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListStrainsInventoryQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
declare function useListStrainsInventoryQuery(baseOptions: Apollo.QueryHookOptions<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>): Apollo.QueryResult<ListStrainsInventoryQuery, Exact<{
    cursor: number;
    limit: number;
}>>;
declare function useListStrainsInventoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>): Apollo.LazyQueryResultTuple<ListStrainsInventoryQuery, Exact<{
    cursor: number;
    limit: number;
}>>;
declare type ListStrainsInventoryQueryHookResult = ReturnType<typeof useListStrainsInventoryQuery>;
declare type ListStrainsInventoryLazyQueryHookResult = ReturnType<typeof useListStrainsInventoryLazyQuery>;
declare type ListStrainsInventoryQueryResult = Apollo.QueryResult<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>;
declare const ListPlasmidsInventoryDocument: Apollo.DocumentNode;
/**
 * __useListPlasmidsInventoryQuery__
 *
 * To run a query within a React component, call `useListPlasmidsInventoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPlasmidsInventoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPlasmidsInventoryQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
declare function useListPlasmidsInventoryQuery(baseOptions: Apollo.QueryHookOptions<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>): Apollo.QueryResult<ListPlasmidsInventoryQuery, Exact<{
    cursor: number;
    limit: number;
}>>;
declare function useListPlasmidsInventoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>): Apollo.LazyQueryResultTuple<ListPlasmidsInventoryQuery, Exact<{
    cursor: number;
    limit: number;
}>>;
declare type ListPlasmidsInventoryQueryHookResult = ReturnType<typeof useListPlasmidsInventoryQuery>;
declare type ListPlasmidsInventoryLazyQueryHookResult = ReturnType<typeof useListPlasmidsInventoryLazyQuery>;
declare type ListPlasmidsInventoryQueryResult = Apollo.QueryResult<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>;
declare const PlasmidListFilterDocument: Apollo.DocumentNode;
/**
 * __usePlasmidListFilterQuery__
 *
 * To run a query within a React component, call `usePlasmidListFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlasmidListFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlasmidListFilterQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      filter: // value for 'filter'
 *   },
 * });
 */
declare function usePlasmidListFilterQuery(baseOptions: Apollo.QueryHookOptions<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>): Apollo.QueryResult<PlasmidListFilterQuery, Exact<{
    cursor: number;
    limit: number;
    filter: string;
}>>;
declare function usePlasmidListFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>): Apollo.LazyQueryResultTuple<PlasmidListFilterQuery, Exact<{
    cursor: number;
    limit: number;
    filter: string;
}>>;
declare type PlasmidListFilterQueryHookResult = ReturnType<typeof usePlasmidListFilterQuery>;
declare type PlasmidListFilterLazyQueryHookResult = ReturnType<typeof usePlasmidListFilterLazyQuery>;
declare type PlasmidListFilterQueryResult = Apollo.QueryResult<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>;
declare const PlasmidDocument: Apollo.DocumentNode;
/**
 * __usePlasmidQuery__
 *
 * To run a query within a React component, call `usePlasmidQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlasmidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlasmidQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
declare function usePlasmidQuery(baseOptions: Apollo.QueryHookOptions<PlasmidQuery, PlasmidQueryVariables>): Apollo.QueryResult<PlasmidQuery, Exact<{
    id: string;
}>>;
declare function usePlasmidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlasmidQuery, PlasmidQueryVariables>): Apollo.LazyQueryResultTuple<PlasmidQuery, Exact<{
    id: string;
}>>;
declare type PlasmidQueryHookResult = ReturnType<typeof usePlasmidQuery>;
declare type PlasmidLazyQueryHookResult = ReturnType<typeof usePlasmidLazyQuery>;
declare type PlasmidQueryResult = Apollo.QueryResult<PlasmidQuery, PlasmidQueryVariables>;
declare const StrainDocument: Apollo.DocumentNode;
/**
 * __useStrainQuery__
 *
 * To run a query within a React component, call `useStrainQuery` and pass it any options that fit your needs.
 * When your component renders, `useStrainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStrainQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
declare function useStrainQuery(baseOptions: Apollo.QueryHookOptions<StrainQuery, StrainQueryVariables>): Apollo.QueryResult<StrainQuery, Exact<{
    id: string;
}>>;
declare function useStrainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StrainQuery, StrainQueryVariables>): Apollo.LazyQueryResultTuple<StrainQuery, Exact<{
    id: string;
}>>;
declare type StrainQueryHookResult = ReturnType<typeof useStrainQuery>;
declare type StrainLazyQueryHookResult = ReturnType<typeof useStrainLazyQuery>;
declare type StrainQueryResult = Apollo.QueryResult<StrainQuery, StrainQueryVariables>;
declare const ListRecentPlasmidsDocument: Apollo.DocumentNode;
/**
 * __useListRecentPlasmidsQuery__
 *
 * To run a query within a React component, call `useListRecentPlasmidsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRecentPlasmidsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRecentPlasmidsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
declare function useListRecentPlasmidsQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>): Apollo.QueryResult<ListRecentPlasmidsQuery, Exact<{
    limit?: number | undefined;
}>>;
declare function useListRecentPlasmidsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>): Apollo.LazyQueryResultTuple<ListRecentPlasmidsQuery, Exact<{
    limit?: number | undefined;
}>>;
declare type ListRecentPlasmidsQueryHookResult = ReturnType<typeof useListRecentPlasmidsQuery>;
declare type ListRecentPlasmidsLazyQueryHookResult = ReturnType<typeof useListRecentPlasmidsLazyQuery>;
declare type ListRecentPlasmidsQueryResult = Apollo.QueryResult<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>;
declare const ListRecentStrainsDocument: Apollo.DocumentNode;
/**
 * __useListRecentStrainsQuery__
 *
 * To run a query within a React component, call `useListRecentStrainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRecentStrainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRecentStrainsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
declare function useListRecentStrainsQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>): Apollo.QueryResult<ListRecentStrainsQuery, Exact<{
    limit?: number | undefined;
}>>;
declare function useListRecentStrainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>): Apollo.LazyQueryResultTuple<ListRecentStrainsQuery, Exact<{
    limit?: number | undefined;
}>>;
declare type ListRecentStrainsQueryHookResult = ReturnType<typeof useListRecentStrainsQuery>;
declare type ListRecentStrainsLazyQueryHookResult = ReturnType<typeof useListRecentStrainsLazyQuery>;
declare type ListRecentStrainsQueryResult = Apollo.QueryResult<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>;
declare const UserByEmailDocument: Apollo.DocumentNode;
/**
 * __useUserByEmailQuery__
 *
 * To run a query within a React component, call `useUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
declare function useUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<UserByEmailQuery, UserByEmailQueryVariables>): Apollo.QueryResult<UserByEmailQuery, Exact<{
    email: string;
}>>;
declare function useUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByEmailQuery, UserByEmailQueryVariables>): Apollo.LazyQueryResultTuple<UserByEmailQuery, Exact<{
    email: string;
}>>;
declare type UserByEmailQueryHookResult = ReturnType<typeof useUserByEmailQuery>;
declare type UserByEmailLazyQueryHookResult = ReturnType<typeof useUserByEmailLazyQuery>;
declare type UserByEmailQueryResult = Apollo.QueryResult<UserByEmailQuery, UserByEmailQueryVariables>;

export { AssociatedSequences, Auth, Author, BasePublication, Citation, Content, ContentBySlugDocument, ContentBySlugLazyQueryHookResult, ContentBySlugQuery, ContentBySlugQueryHookResult, ContentBySlugQueryResult, ContentBySlugQueryVariables, ContentDocument, ContentLazyQueryHookResult, ContentQuery, ContentQueryHookResult, ContentQueryResult, ContentQueryVariables, CreateContentDocument, CreateContentInput, CreateContentMutation, CreateContentMutationFn, CreateContentMutationHookResult, CreateContentMutationOptions, CreateContentMutationResult, CreateContentMutationVariables, CreateOrderDocument, CreateOrderInput, CreateOrderMutation, CreateOrderMutationFn, CreateOrderMutationHookResult, CreateOrderMutationOptions, CreateOrderMutationResult, CreateOrderMutationVariables, CreatePermissionInput, CreatePlasmidInput, CreateRoleInput, CreateStrainInput, CreateUserDocument, CreateUserInput, CreateUserMutation, CreateUserMutationFn, CreateUserMutationHookResult, CreateUserMutationOptions, CreateUserMutationResult, CreateUserMutationVariables, DeleteContent, DeletePermission, DeleteRole, DeleteStock, DeleteUser, Download, DownloadItem, Exact, Extension, Gene, GeneDocument, GeneLazyQueryHookResult, GeneQuery, GeneQueryHookResult, GeneQueryResult, GeneQueryVariables, GeneralInfo, GenomicCoordinates, GetRefreshTokenDocument, GetRefreshTokenLazyQueryHookResult, GetRefreshTokenQuery, GetRefreshTokenQueryHookResult, GetRefreshTokenQueryResult, GetRefreshTokenQueryVariables, GoAnnotation, Identity, InputMaybe, Links, ListBacterialStrainsDocument, ListBacterialStrainsLazyQueryHookResult, ListBacterialStrainsQuery, ListBacterialStrainsQueryHookResult, ListBacterialStrainsQueryResult, ListBacterialStrainsQueryVariables, ListOrganismsDocument, ListOrganismsLazyQueryHookResult, ListOrganismsQuery, ListOrganismsQueryHookResult, ListOrganismsQueryResult, ListOrganismsQueryVariables, ListPlasmidsInventoryDocument, ListPlasmidsInventoryLazyQueryHookResult, ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryHookResult, ListPlasmidsInventoryQueryResult, ListPlasmidsInventoryQueryVariables, ListRecentGenesDocument, ListRecentGenesLazyQueryHookResult, ListRecentGenesQuery, ListRecentGenesQueryHookResult, ListRecentGenesQueryResult, ListRecentGenesQueryVariables, ListRecentPlasmidsDocument, ListRecentPlasmidsLazyQueryHookResult, ListRecentPlasmidsQuery, ListRecentPlasmidsQueryHookResult, ListRecentPlasmidsQueryResult, ListRecentPlasmidsQueryVariables, ListRecentPublicationsDocument, ListRecentPublicationsLazyQueryHookResult, ListRecentPublicationsQuery, ListRecentPublicationsQueryHookResult, ListRecentPublicationsQueryResult, ListRecentPublicationsQueryVariables, ListRecentStrainsDocument, ListRecentStrainsLazyQueryHookResult, ListRecentStrainsQuery, ListRecentStrainsQueryHookResult, ListRecentStrainsQueryResult, ListRecentStrainsQueryVariables, ListStrainsInventoryDocument, ListStrainsInventoryLazyQueryHookResult, ListStrainsInventoryQuery, ListStrainsInventoryQueryHookResult, ListStrainsInventoryQueryResult, ListStrainsInventoryQueryVariables, ListStrainsWithPhenotypeDocument, ListStrainsWithPhenotypeLazyQueryHookResult, ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryHookResult, ListStrainsWithPhenotypeQueryResult, ListStrainsWithPhenotypeQueryVariables, LoginDocument, LoginInput, LoginMutation, LoginMutationFn, LoginMutationHookResult, LoginMutationOptions, LoginMutationResult, LoginMutationVariables, Logout, LogoutDocument, LogoutMutation, LogoutMutationFn, LogoutMutationHookResult, LogoutMutationOptions, LogoutMutationResult, LogoutMutationVariables, MakeMaybe, MakeOptional, Maybe, Mutation, MutationCreateContentArgs, MutationCreateOrderArgs, MutationCreatePermissionArgs, MutationCreatePlasmidArgs, MutationCreateRoleArgs, MutationCreateRolePermissionRelationshipArgs, MutationCreateStrainArgs, MutationCreateUserArgs, MutationCreateUserRoleRelationshipArgs, MutationDeleteContentArgs, MutationDeletePermissionArgs, MutationDeleteRoleArgs, MutationDeleteStockArgs, MutationDeleteUserArgs, MutationLoginArgs, MutationUpdateContentArgs, MutationUpdateOrderArgs, MutationUpdatePermissionArgs, MutationUpdatePlasmidArgs, MutationUpdateRoleArgs, MutationUpdateStrainArgs, MutationUpdateUserArgs, NameWithLink, NumberOfPublicationsWithGene, Order, OrderListWithCursor, Organism, Orthologs, Permission, Phenotype, Plasmid, PlasmidDocument, PlasmidLazyQueryHookResult, PlasmidListFilterDocument, PlasmidListFilterLazyQueryHookResult, PlasmidListFilterQuery, PlasmidListFilterQueryHookResult, PlasmidListFilterQueryResult, PlasmidListFilterQueryVariables, PlasmidListWithCursor, PlasmidQuery, PlasmidQueryHookResult, PlasmidQueryResult, PlasmidQueryVariables, ProductInformation, ProteinGeneralInfo, ProteinInformation, Publication, PublicationDocument, PublicationLazyQueryHookResult, PublicationQuery, PublicationQueryHookResult, PublicationQueryResult, PublicationQueryVariables, PublicationWithGene, Query, QueryAllOrthologsArgs, QueryAllPublicationsArgs, QueryAllStrainsArgs, QueryContentArgs, QueryContentBySlugArgs, QueryGeneArgs, QueryGeneralInformationArgs, QueryGetAssociatedSequncesArgs, QueryGetLinksArgs, QueryGetProteinInformationArgs, QueryGetRefreshTokenArgs, QueryListGeneProductInfoArgs, QueryListOrdersArgs, QueryListPlasmidsArgs, QueryListPlasmidsWithAnnotationArgs, QueryListRecentGenesArgs, QueryListRecentPlasmidsArgs, QueryListRecentPublicationsArgs, QueryListRecentStrainsArgs, QueryListStrainsArgs, QueryListStrainsWithAnnotationArgs, QueryListUsersArgs, QueryOrderArgs, QueryOrganismArgs, QueryPermissionArgs, QueryPlasmidArgs, QueryPublicationArgs, QueryRoleArgs, QueryStrainArgs, QueryUserArgs, QueryUserByEmailArgs, Role, Scalars, StatusEnum, Stock, Strain, StrainDocument, StrainLazyQueryHookResult, StrainListDocument, StrainListFilter, StrainListLazyQueryHookResult, StrainListQuery, StrainListQueryHookResult, StrainListQueryResult, StrainListQueryVariables, StrainListWithCursor, StrainQuery, StrainQueryHookResult, StrainQueryResult, StrainQueryVariables, StrainType, UpdateContentDocument, UpdateContentInput, UpdateContentMutation, UpdateContentMutationFn, UpdateContentMutationHookResult, UpdateContentMutationOptions, UpdateContentMutationResult, UpdateContentMutationVariables, UpdateOrderInput, UpdatePermissionInput, UpdatePlasmidInput, UpdateRoleInput, UpdateStrainInput, UpdateUserDocument, UpdateUserInput, UpdateUserMutation, UpdateUserMutationFn, UpdateUserMutationHookResult, UpdateUserMutationOptions, UpdateUserMutationResult, UpdateUserMutationVariables, User, UserByEmailDocument, UserByEmailLazyQueryHookResult, UserByEmailQuery, UserByEmailQueryHookResult, UserByEmailQueryResult, UserByEmailQueryVariables, UserList, With, useContentBySlugLazyQuery, useContentBySlugQuery, useContentLazyQuery, useContentQuery, useCreateContentMutation, useCreateOrderMutation, useCreateUserMutation, useGeneLazyQuery, useGeneQuery, useGetRefreshTokenLazyQuery, useGetRefreshTokenQuery, useListBacterialStrainsLazyQuery, useListBacterialStrainsQuery, useListOrganismsLazyQuery, useListOrganismsQuery, useListPlasmidsInventoryLazyQuery, useListPlasmidsInventoryQuery, useListRecentGenesLazyQuery, useListRecentGenesQuery, useListRecentPlasmidsLazyQuery, useListRecentPlasmidsQuery, useListRecentPublicationsLazyQuery, useListRecentPublicationsQuery, useListRecentStrainsLazyQuery, useListRecentStrainsQuery, useListStrainsInventoryLazyQuery, useListStrainsInventoryQuery, useListStrainsWithPhenotypeLazyQuery, useListStrainsWithPhenotypeQuery, useLoginMutation, useLogoutMutation, usePlasmidLazyQuery, usePlasmidListFilterLazyQuery, usePlasmidListFilterQuery, usePlasmidQuery, usePublicationLazyQuery, usePublicationQuery, useStrainLazyQuery, useStrainListLazyQuery, useStrainListQuery, useStrainQuery, useUpdateContentMutation, useUpdateUserMutation, useUserByEmailLazyQuery, useUserByEmailQuery };
