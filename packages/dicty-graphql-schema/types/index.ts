import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
};

export type AssociatedSequences = {
  __typename?: 'AssociatedSequences';
  ests: Array<NameWithLink>;
  genbank_genomic_fragment?: Maybe<NameWithLink>;
  genbank_mrna?: Maybe<NameWithLink>;
  more_link: Scalars['String'];
};

export type Auth = {
  __typename?: 'Auth';
  identity: Identity;
  token: Scalars['String'];
  user: User;
};

export type Author = {
  __typename?: 'Author';
  first_name?: Maybe<Scalars['String']>;
  initials?: Maybe<Scalars['String']>;
  last_name: Scalars['String'];
  rank?: Maybe<Scalars['String']>;
};

export type BasePublication = {
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

export type Citation = {
  __typename?: 'Citation';
  authors: Scalars['String'];
  journal: Scalars['String'];
  pubmed_id: Scalars['String'];
  title: Scalars['String'];
};

export type Content = {
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

export type CreateContentInput = {
  content: Scalars['String'];
  created_by: Scalars['String'];
  name: Scalars['String'];
  namespace: Scalars['String'];
};

export type CreateOrderInput = {
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

export type CreatePermissionInput = {
  description: Scalars['String'];
  permission: Scalars['String'];
  resource: Scalars['String'];
};

export type CreatePlasmidInput = {
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

export type CreateRoleInput = {
  description: Scalars['String'];
  role: Scalars['String'];
};

export type CreateStrainInput = {
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

export type CreateUserInput = {
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

export type DeleteContent = {
  __typename?: 'DeleteContent';
  success: Scalars['Boolean'];
};

export type DeletePermission = {
  __typename?: 'DeletePermission';
  success: Scalars['Boolean'];
};

export type DeleteRole = {
  __typename?: 'DeleteRole';
  success: Scalars['Boolean'];
};

export type DeleteStock = {
  __typename?: 'DeleteStock';
  success: Scalars['Boolean'];
};

export type DeleteUser = {
  __typename?: 'DeleteUser';
  success: Scalars['Boolean'];
};

export type Download = {
  __typename?: 'Download';
  items: Array<DownloadItem>;
  title: Scalars['String'];
};

export type DownloadItem = {
  __typename?: 'DownloadItem';
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Extension = {
  __typename?: 'Extension';
  db: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  relation: Scalars['String'];
};

export type GoAnnotation = {
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

export type Gene = {
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

export type GeneralInfo = {
  __typename?: 'GeneralInfo';
  alt_gene_name?: Maybe<Array<Scalars['String']>>;
  alt_protein_names?: Maybe<Array<Scalars['String']>>;
  description: Scalars['String'];
  gene_product: Scalars['String'];
  name_description: Array<Scalars['String']>;
};

export type GenomicCoordinates = {
  __typename?: 'GenomicCoordinates';
  chrom_coords: Scalars['String'];
  exon: Scalars['String'];
  local_coords: Scalars['String'];
};

export type Identity = {
  __typename?: 'Identity';
  created_at: Scalars['Timestamp'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  provider: Scalars['String'];
  updated_at: Scalars['Timestamp'];
  user_id: Scalars['ID'];
};

export type Links = {
  __typename?: 'Links';
  colleagues: NameWithLink;
  expression: Array<NameWithLink>;
  ext_resources: Array<NameWithLink>;
};

export type LoginInput = {
  client_id: Scalars['String'];
  code: Scalars['String'];
  provider: Scalars['String'];
  redirect_url: Scalars['String'];
  scopes: Scalars['String'];
  state: Scalars['String'];
};

export type Logout = {
  __typename?: 'Logout';
  success: Scalars['Boolean'];
};

export type Mutation = {
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


export type MutationCreateContentArgs = {
  input?: InputMaybe<CreateContentInput>;
};


export type MutationCreateOrderArgs = {
  input?: InputMaybe<CreateOrderInput>;
};


export type MutationCreatePermissionArgs = {
  input?: InputMaybe<CreatePermissionInput>;
};


export type MutationCreatePlasmidArgs = {
  input?: InputMaybe<CreatePlasmidInput>;
};


export type MutationCreateRoleArgs = {
  input?: InputMaybe<CreateRoleInput>;
};


export type MutationCreateRolePermissionRelationshipArgs = {
  permissionId: Scalars['ID'];
  roleId: Scalars['ID'];
};


export type MutationCreateStrainArgs = {
  input?: InputMaybe<CreateStrainInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationCreateUserRoleRelationshipArgs = {
  roleId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePermissionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteStockArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationUpdateContentArgs = {
  input?: InputMaybe<UpdateContentInput>;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateOrderInput>;
};


export type MutationUpdatePermissionArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdatePermissionInput>;
};


export type MutationUpdatePlasmidArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdatePlasmidInput>;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateRoleInput>;
};


export type MutationUpdateStrainArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateStrainInput>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateUserInput>;
};

export type NameWithLink = {
  __typename?: 'NameWithLink';
  link: Scalars['String'];
  name: Scalars['String'];
};

export type NumberOfPublicationsWithGene = {
  __typename?: 'NumberOfPublicationsWithGene';
  num_pubs: Scalars['Int'];
  publications: Array<PublicationWithGene>;
};

export type Order = {
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

export type OrderListWithCursor = {
  __typename?: 'OrderListWithCursor';
  limit?: Maybe<Scalars['Int']>;
  nextCursor: Scalars['Int'];
  orders: Array<Order>;
  previousCursor: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Organism = {
  __typename?: 'Organism';
  citations: Array<Citation>;
  downloads: Array<Download>;
  scientific_name: Scalars['String'];
  taxon_id: Scalars['String'];
};

export type Orthologs = {
  __typename?: 'Orthologs';
  gene_product: Scalars['String'];
  id: NameWithLink;
  source: Array<Scalars['String']>;
  species: Scalars['String'];
  uniprotkb: NameWithLink;
};

export type Permission = {
  __typename?: 'Permission';
  created_at: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['ID'];
  permission: Scalars['String'];
  resource?: Maybe<Scalars['String']>;
  updated_at: Scalars['Timestamp'];
};

export type Phenotype = {
  __typename?: 'Phenotype';
  assay?: Maybe<Scalars['String']>;
  environment?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  phenotype: Scalars['String'];
  publication?: Maybe<Publication>;
};

export type Plasmid = Stock & {
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

export type PlasmidListWithCursor = {
  __typename?: 'PlasmidListWithCursor';
  limit?: Maybe<Scalars['Int']>;
  nextCursor: Scalars['Int'];
  plasmids: Array<Plasmid>;
  previousCursor: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type ProductInformation = {
  __typename?: 'ProductInformation';
  genomic_coords: Array<GenomicCoordinates>;
  more_protein_data: Scalars['String'];
  protein_coding_gene: NameWithLink;
  protein_length: Scalars['String'];
  protein_molecular_weight: Scalars['String'];
};

export type ProteinGeneralInfo = {
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

export type ProteinInformation = {
  __typename?: 'ProteinInformation';
  external_links: Array<NameWithLink>;
  general_info: ProteinGeneralInfo;
  protein_sequence: Scalars['String'];
};

export type Publication = BasePublication & {
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

export type PublicationWithGene = BasePublication & {
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

export type Query = {
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


export type QueryAllOrthologsArgs = {
  gene: Scalars['String'];
};


export type QueryAllPublicationsArgs = {
  gene: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
};


export type QueryAllStrainsArgs = {
  gene: Scalars['String'];
};


export type QueryContentArgs = {
  id: Scalars['ID'];
};


export type QueryContentBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGeneArgs = {
  gene: Scalars['String'];
};


export type QueryGeneralInformationArgs = {
  gene: Scalars['String'];
};


export type QueryGetAssociatedSequncesArgs = {
  gene: Scalars['String'];
};


export type QueryGetLinksArgs = {
  gene: Scalars['String'];
};


export type QueryGetProteinInformationArgs = {
  gene: Scalars['String'];
};


export type QueryGetRefreshTokenArgs = {
  token: Scalars['String'];
};


export type QueryListGeneProductInfoArgs = {
  gene: Scalars['String'];
};


export type QueryListOrdersArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryListPlasmidsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryListPlasmidsWithAnnotationArgs = {
  annotation: Scalars['String'];
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  type: Scalars['String'];
};


export type QueryListRecentGenesArgs = {
  limit: Scalars['Int'];
};


export type QueryListRecentPlasmidsArgs = {
  limit: Scalars['Int'];
};


export type QueryListRecentPublicationsArgs = {
  limit: Scalars['Int'];
};


export type QueryListRecentStrainsArgs = {
  limit: Scalars['Int'];
};


export type QueryListStrainsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<StrainListFilter>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryListStrainsWithAnnotationArgs = {
  annotation: Scalars['String'];
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  type: Scalars['String'];
};


export type QueryListUsersArgs = {
  filter: Scalars['String'];
  pagenum: Scalars['String'];
  pagesize: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrganismArgs = {
  taxon_id: Scalars['String'];
};


export type QueryPermissionArgs = {
  id: Scalars['ID'];
};


export type QueryPlasmidArgs = {
  id: Scalars['ID'];
};


export type QueryPublicationArgs = {
  id: Scalars['ID'];
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryStrainArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  created_at: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['ID'];
  permissions?: Maybe<Array<Permission>>;
  role: Scalars['String'];
  updated_at: Scalars['Timestamp'];
};

export enum StatusEnum {
  Cancelled = 'CANCELLED',
  Growing = 'GROWING',
  InPreparation = 'IN_PREPARATION',
  Shipped = 'SHIPPED'
}

export type Stock = {
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

export type Strain = Stock & {
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

export type StrainListFilter = {
  id?: InputMaybe<Scalars['ID']>;
  in_stock?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  strain_type: StrainType;
  summary?: InputMaybe<Scalars['String']>;
};

export type StrainListWithCursor = {
  __typename?: 'StrainListWithCursor';
  limit?: Maybe<Scalars['Int']>;
  nextCursor: Scalars['Int'];
  previousCursor: Scalars['Int'];
  strains: Array<Strain>;
  totalCount: Scalars['Int'];
};

export enum StrainType {
  All = 'ALL',
  Bacterial = 'BACTERIAL',
  Gwdi = 'GWDI',
  Regular = 'REGULAR'
}

export type UpdateContentInput = {
  content: Scalars['String'];
  id: Scalars['ID'];
  updated_by: Scalars['String'];
};

export type UpdateOrderInput = {
  comments?: InputMaybe<Scalars['String']>;
  courier?: InputMaybe<Scalars['String']>;
  courier_account?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<Scalars['String']>>;
  payment?: InputMaybe<Scalars['String']>;
  purchase_order_num?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusEnum>;
};

export type UpdatePermissionInput = {
  description: Scalars['String'];
  permission: Scalars['String'];
  resource: Scalars['String'];
};

export type UpdatePlasmidInput = {
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

export type UpdateRoleInput = {
  description: Scalars['String'];
  role: Scalars['String'];
};

export type UpdateStrainInput = {
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

export type UpdateUserInput = {
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

export type User = {
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

export type UserList = {
  __typename?: 'UserList';
  pageNum?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['String']>;
  totalCount: Scalars['Int'];
  users: Array<User>;
};

export type With = {
  __typename?: 'With';
  db: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Auth', token: string, user: { __typename?: 'User', id: string, email: string, first_name: string, last_name: string, roles?: Array<{ __typename?: 'Role', role: string, permissions?: Array<{ __typename?: 'Permission', permission: string, resource?: string | null }> | null }> | null }, identity: { __typename?: 'Identity', provider: string } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'Logout', success: boolean } | null };

export type CreateContentMutationVariables = Exact<{
  input: CreateContentInput;
}>;


export type CreateContentMutation = { __typename?: 'Mutation', createContent?: { __typename?: 'Content', name: string, content: string, namespace: string, created_by: { __typename?: 'User', id: string } } | null };

export type UpdateContentMutationVariables = Exact<{
  input: UpdateContentInput;
}>;


export type UpdateContentMutation = { __typename?: 'Mutation', updateContent?: { __typename?: 'Content', id: string, content: string, updated_by: { __typename?: 'User', id: string } } | null };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'Order', id: string } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string } | null };

export type GetRefreshTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetRefreshTokenQuery = { __typename?: 'Query', getRefreshToken?: { __typename?: 'Auth', token: string, user: { __typename?: 'User', id: string, email: string, first_name: string, last_name: string, roles?: Array<{ __typename?: 'Role', role: string, permissions?: Array<{ __typename?: 'Permission', permission: string, resource?: string | null }> | null }> | null }, identity: { __typename?: 'Identity', provider: string } } | null };

export type ContentBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ContentBySlugQuery = { __typename?: 'Query', contentBySlug?: { __typename?: 'Content', id: string, content: string, name: string, slug: string, updated_at: any, updated_by: { __typename?: 'User', id: string, email: string, first_name: string, last_name: string, roles?: Array<{ __typename?: 'Role', role: string, permissions?: Array<{ __typename?: 'Permission', permission: string, resource?: string | null }> | null }> | null } } | null };

export type ContentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ContentQuery = { __typename?: 'Query', content?: { __typename?: 'Content', id: string, content: string, name: string, slug: string, namespace: string, updated_at: any, updated_by: { __typename?: 'User', id: string, email: string, first_name: string, last_name: string, roles?: Array<{ __typename?: 'Role', role: string, permissions?: Array<{ __typename?: 'Permission', permission: string, resource?: string | null }> | null }> | null } } | null };

export type ListOrganismsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListOrganismsQuery = { __typename?: 'Query', listOrganisms?: Array<{ __typename?: 'Organism', taxon_id: string, scientific_name: string, citations: Array<{ __typename?: 'Citation', title: string, authors: string, pubmed_id: string, journal: string }>, downloads: Array<{ __typename?: 'Download', title: string, items: Array<{ __typename?: 'DownloadItem', title: string, url: string }> }> }> | null };

export type GeneQueryVariables = Exact<{
  gene: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
}>;


export type GeneQuery = { __typename?: 'Query', allStrains?: { __typename?: 'Gene', id: string, name: string, strains?: Array<{ __typename?: 'Strain', id: string, label: string, characteristics?: Array<string> | null, in_stock: boolean, phenotypes?: Array<{ __typename?: 'Phenotype', phenotype: string, publication?: { __typename?: 'Publication', id: string, title: string, journal: string, pages?: string | null, volume?: string | null, pub_date?: any | null, authors: Array<{ __typename?: 'Author', last_name: string, rank?: string | null }> } | null }> | null }> | null } | null, gene?: { __typename?: 'Gene', id: string, name: string, goas?: Array<{ __typename?: 'GOAnnotation', id: string, type: string, date: string, evidence_code: string, go_term: string, qualifier: string, publication: string, assigned_by: string, with?: Array<{ __typename?: 'With', id: string, db: string, name: string }> | null, extensions?: Array<{ __typename?: 'Extension', id: string, db: string, relation: string, name: string }> | null }> | null } | null, allPublications: { __typename?: 'NumberOfPublicationsWithGene', num_pubs: number, publications: Array<{ __typename?: 'PublicationWithGene', id: string, doi?: string | null, title: string, journal: string, pub_date?: any | null, volume?: string | null, pages?: string | null, pub_type: string, source: string, issue?: string | null, related_genes: Array<{ __typename?: 'Gene', id: string, name: string }>, authors: Array<{ __typename?: 'Author', last_name: string, rank?: string | null }> }> }, allOrthologs?: { __typename?: 'Gene', id: string, name: string, orthologs?: Array<{ __typename?: 'Orthologs', species: string, gene_product: string, source: Array<string>, id: { __typename?: 'NameWithLink', name: string, link: string }, uniprotkb: { __typename?: 'NameWithLink', name: string, link: string } }> | null } | null, listGeneProductInfo?: { __typename?: 'Gene', id: string, name: string, product_info?: Array<{ __typename?: 'ProductInformation', protein_length: string, protein_molecular_weight: string, more_protein_data: string, protein_coding_gene: { __typename?: 'NameWithLink', name: string, link: string }, genomic_coords: Array<{ __typename?: 'GenomicCoordinates', exon: string, local_coords: string, chrom_coords: string }> }> | null } | null, generalInformation?: { __typename?: 'Gene', id: string, name: string, general_info: { __typename?: 'GeneralInfo', name_description: Array<string>, alt_gene_name?: Array<string> | null, gene_product: string, alt_protein_names?: Array<string> | null, description: string } } | null, getAssociatedSequnces?: { __typename?: 'Gene', id: string, name: string, associated_sequences: { __typename?: 'AssociatedSequences', more_link: string, genbank_genomic_fragment?: { __typename?: 'NameWithLink', name: string, link: string } | null, genbank_mrna?: { __typename?: 'NameWithLink', name: string, link: string } | null, ests: Array<{ __typename?: 'NameWithLink', name: string, link: string }> } } | null, getLinks?: { __typename?: 'Gene', id: string, name: string, links: { __typename?: 'Links', expression: Array<{ __typename?: 'NameWithLink', name: string, link: string }>, colleagues: { __typename?: 'NameWithLink', name: string, link: string }, ext_resources: Array<{ __typename?: 'NameWithLink', name: string, link: string }> } } | null, getProteinInformation?: { __typename?: 'Gene', id: string, name: string, protein_information?: { __typename?: 'ProteinInformation', protein_sequence: string, general_info: { __typename?: 'ProteinGeneralInfo', gene_product: string, dictybase_id: string, description: string, protein_length: string, molecular_weight: string, subcellular_location: string, protein_existence: string, note: string, aa_composition: { __typename?: 'NameWithLink', name: string, link: string } }, external_links: Array<{ __typename?: 'NameWithLink', name: string, link: string }> } | null } | null };

export type ListRecentGenesQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type ListRecentGenesQuery = { __typename?: 'Query', listRecentGenes?: Array<{ __typename?: 'Gene', id: string, name: string }> | null };

export type PublicationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PublicationQuery = { __typename?: 'Query', publication?: { __typename?: 'Publication', id: string, doi?: string | null, title: string, abstract: string, journal: string, pub_date?: any | null, pages?: string | null, issue?: string | null, volume?: string | null, authors: Array<{ __typename?: 'Author', initials?: string | null, last_name: string }> } | null };

export type ListRecentPublicationsQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type ListRecentPublicationsQuery = { __typename?: 'Query', listRecentPublications?: Array<{ __typename?: 'Publication', id: string, doi?: string | null, title: string, abstract: string, journal: string, pub_date?: any | null, pages?: string | null, issue?: string | null, volume?: string | null, authors: Array<{ __typename?: 'Author', initials?: string | null, last_name: string }> }> | null };

export type StrainListQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
  filter?: InputMaybe<StrainListFilter>;
}>;


export type StrainListQuery = { __typename?: 'Query', listStrains?: { __typename?: 'StrainListWithCursor', nextCursor: number, totalCount: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, in_stock: boolean }> } | null };

export type ListStrainsWithPhenotypeQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
  type: Scalars['String'];
  annotation: Scalars['String'];
}>;


export type ListStrainsWithPhenotypeQuery = { __typename?: 'Query', listStrainsWithAnnotation?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, genes?: Array<{ __typename?: 'Gene', name: string }> | null, publications?: Array<{ __typename?: 'Publication', id: string, pub_date?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, authors: Array<{ __typename?: 'Author', last_name: string }> }> | null }> } | null };

export type ListBacterialStrainsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListBacterialStrainsQuery = { __typename?: 'Query', bacterialFoodSource?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, in_stock: boolean }> } | null, symbioticFarmerBacterium?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, in_stock: boolean }> } | null };

export type ListStrainsInventoryQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ListStrainsInventoryQuery = { __typename?: 'Query', listStrainsWithAnnotation?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, in_stock: boolean }> } | null };

export type ListPlasmidsInventoryQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ListPlasmidsInventoryQuery = { __typename?: 'Query', listPlasmidsWithAnnotation?: { __typename?: 'PlasmidListWithCursor', totalCount: number, nextCursor: number, plasmids: Array<{ __typename?: 'Plasmid', id: string, name: string, summary?: string | null, in_stock: boolean }> } | null };

export type PlasmidListFilterQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
  filter: Scalars['String'];
}>;


export type PlasmidListFilterQuery = { __typename?: 'Query', listPlasmids?: { __typename?: 'PlasmidListWithCursor', nextCursor: number, totalCount: number, plasmids: Array<{ __typename?: 'Plasmid', id: string, name: string, summary?: string | null, in_stock: boolean }> } | null };

export type PlasmidQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlasmidQuery = { __typename?: 'Query', plasmid?: { __typename?: 'Plasmid', id: string, name: string, summary?: string | null, dbxrefs?: Array<string> | null, image_map?: string | null, sequence?: string | null, keywords?: Array<string> | null, genbank_accession?: string | null, in_stock: boolean, depositor: { __typename?: 'User', first_name: string, last_name: string }, publications?: Array<{ __typename?: 'Publication', id: string, pub_date?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Author', last_name: string }> }> | null, genes?: Array<{ __typename?: 'Gene', name: string }> | null } | null };

export type StrainQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StrainQuery = { __typename?: 'Query', strain?: { __typename?: 'Strain', id: string, label: string, summary?: string | null, species: string, plasmid?: string | null, dbxrefs?: Array<string> | null, in_stock: boolean, systematic_name: string, genotypes?: Array<string> | null, mutagenesis_method?: string | null, genetic_modification?: string | null, names?: Array<string> | null, characteristics?: Array<string> | null, parent?: { __typename?: 'Strain', id: string, label: string } | null, depositor: { __typename?: 'User', first_name: string, last_name: string }, publications?: Array<{ __typename?: 'Publication', id: string, pub_date?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Author', last_name: string }> }> | null, genes?: Array<{ __typename?: 'Gene', name: string }> | null, phenotypes?: Array<{ __typename?: 'Phenotype', phenotype: string, note?: string | null, assay?: string | null, environment?: string | null, publication?: { __typename?: 'Publication', id: string, pub_date?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, authors: Array<{ __typename?: 'Author', last_name: string }> } | null }> | null } | null };

export type ListRecentPlasmidsQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type ListRecentPlasmidsQuery = { __typename?: 'Query', listRecentPlasmids?: Array<{ __typename?: 'Plasmid', id: string, created_at: any, name: string }> | null };

export type ListRecentStrainsQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type ListRecentStrainsQuery = { __typename?: 'Query', listRecentStrains?: Array<{ __typename?: 'Strain', id: string, created_at: any, systematic_name: string }> | null };

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserByEmailQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', id: string } | null };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      first_name
      last_name
      roles {
        role
        permissions {
          permission
          resource
        }
      }
    }
    identity {
      provider
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateContentDocument = gql`
    mutation CreateContent($input: CreateContentInput!) {
  createContent(input: $input) {
    name
    created_by {
      id
    }
    content
    namespace
  }
}
    `;
export type CreateContentMutationFn = Apollo.MutationFunction<CreateContentMutation, CreateContentMutationVariables>;

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
export function useCreateContentMutation(baseOptions?: Apollo.MutationHookOptions<CreateContentMutation, CreateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContentMutation, CreateContentMutationVariables>(CreateContentDocument, options);
      }
export type CreateContentMutationHookResult = ReturnType<typeof useCreateContentMutation>;
export type CreateContentMutationResult = Apollo.MutationResult<CreateContentMutation>;
export type CreateContentMutationOptions = Apollo.BaseMutationOptions<CreateContentMutation, CreateContentMutationVariables>;
export const UpdateContentDocument = gql`
    mutation UpdateContent($input: UpdateContentInput!) {
  updateContent(input: $input) {
    id
    updated_by {
      id
    }
    content
  }
}
    `;
export type UpdateContentMutationFn = Apollo.MutationFunction<UpdateContentMutation, UpdateContentMutationVariables>;

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
export function useUpdateContentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContentMutation, UpdateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContentMutation, UpdateContentMutationVariables>(UpdateContentDocument, options);
      }
export type UpdateContentMutationHookResult = ReturnType<typeof useUpdateContentMutation>;
export type UpdateContentMutationResult = Apollo.MutationResult<UpdateContentMutation>;
export type UpdateContentMutationOptions = Apollo.BaseMutationOptions<UpdateContentMutation, UpdateContentMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

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
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

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
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

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
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetRefreshTokenDocument = gql`
    query GetRefreshToken($token: String!) {
  getRefreshToken(token: $token) {
    token
    user {
      id
      email
      first_name
      last_name
      roles {
        role
        permissions {
          permission
          resource
        }
      }
    }
    identity {
      provider
    }
  }
}
    `;

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
export function useGetRefreshTokenQuery(baseOptions: Apollo.QueryHookOptions<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>(GetRefreshTokenDocument, options);
      }
export function useGetRefreshTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>(GetRefreshTokenDocument, options);
        }
export type GetRefreshTokenQueryHookResult = ReturnType<typeof useGetRefreshTokenQuery>;
export type GetRefreshTokenLazyQueryHookResult = ReturnType<typeof useGetRefreshTokenLazyQuery>;
export type GetRefreshTokenQueryResult = Apollo.QueryResult<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>;
export const ContentBySlugDocument = gql`
    query contentBySlug($slug: String!) {
  contentBySlug(slug: $slug) {
    id
    content
    name
    slug
    updated_at
    updated_by {
      id
      email
      first_name
      last_name
      roles {
        role
        permissions {
          permission
          resource
        }
      }
    }
  }
}
    `;

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
export function useContentBySlugQuery(baseOptions: Apollo.QueryHookOptions<ContentBySlugQuery, ContentBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContentBySlugQuery, ContentBySlugQueryVariables>(ContentBySlugDocument, options);
      }
export function useContentBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentBySlugQuery, ContentBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContentBySlugQuery, ContentBySlugQueryVariables>(ContentBySlugDocument, options);
        }
export type ContentBySlugQueryHookResult = ReturnType<typeof useContentBySlugQuery>;
export type ContentBySlugLazyQueryHookResult = ReturnType<typeof useContentBySlugLazyQuery>;
export type ContentBySlugQueryResult = Apollo.QueryResult<ContentBySlugQuery, ContentBySlugQueryVariables>;
export const ContentDocument = gql`
    query content($id: ID!) {
  content(id: $id) {
    id
    content
    name
    slug
    namespace
    updated_at
    updated_by {
      id
      email
      first_name
      last_name
      roles {
        role
        permissions {
          permission
          resource
        }
      }
    }
  }
}
    `;

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
export function useContentQuery(baseOptions: Apollo.QueryHookOptions<ContentQuery, ContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContentQuery, ContentQueryVariables>(ContentDocument, options);
      }
export function useContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentQuery, ContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContentQuery, ContentQueryVariables>(ContentDocument, options);
        }
export type ContentQueryHookResult = ReturnType<typeof useContentQuery>;
export type ContentLazyQueryHookResult = ReturnType<typeof useContentLazyQuery>;
export type ContentQueryResult = Apollo.QueryResult<ContentQuery, ContentQueryVariables>;
export const ListOrganismsDocument = gql`
    query ListOrganisms {
  listOrganisms {
    taxon_id
    scientific_name
    citations {
      title
      authors
      pubmed_id
      journal
    }
    downloads {
      title
      items {
        title
        url
      }
    }
  }
}
    `;

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
export function useListOrganismsQuery(baseOptions?: Apollo.QueryHookOptions<ListOrganismsQuery, ListOrganismsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOrganismsQuery, ListOrganismsQueryVariables>(ListOrganismsDocument, options);
      }
export function useListOrganismsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOrganismsQuery, ListOrganismsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOrganismsQuery, ListOrganismsQueryVariables>(ListOrganismsDocument, options);
        }
export type ListOrganismsQueryHookResult = ReturnType<typeof useListOrganismsQuery>;
export type ListOrganismsLazyQueryHookResult = ReturnType<typeof useListOrganismsLazyQuery>;
export type ListOrganismsQueryResult = Apollo.QueryResult<ListOrganismsQuery, ListOrganismsQueryVariables>;
export const GeneDocument = gql`
    query Gene($gene: String!, $limit: Int, $sort_by: String = "desc") {
  allStrains(gene: $gene) {
    id
    name
    strains {
      id
      label
      characteristics
      in_stock
      phenotypes {
        phenotype
        publication {
          id
          title
          journal
          pages
          volume
          pub_date
          authors {
            last_name
            rank
          }
        }
      }
    }
  }
  gene(gene: $gene) {
    id
    name
    goas {
      id
      type
      date
      evidence_code
      go_term
      qualifier
      publication
      assigned_by
      with {
        id
        db
        name
      }
      extensions {
        id
        db
        relation
        name
      }
    }
  }
  allPublications(gene: $gene, limit: $limit, sort_by: $sort_by) {
    num_pubs
    publications {
      related_genes {
        id
        name
      }
      id
      doi
      title
      journal
      pub_date
      volume
      pages
      pub_type
      source
      issue
      authors {
        last_name
        rank
      }
    }
  }
  allOrthologs(gene: $gene) {
    id
    name
    orthologs {
      id {
        name
        link
      }
      species
      uniprotkb {
        name
        link
      }
      gene_product
      source
    }
  }
  listGeneProductInfo(gene: $gene) {
    id
    name
    product_info {
      protein_coding_gene {
        name
        link
      }
      protein_length
      protein_molecular_weight
      more_protein_data
      genomic_coords {
        exon
        local_coords
        chrom_coords
      }
    }
  }
  generalInformation(gene: $gene) {
    id
    name
    general_info {
      name_description
      alt_gene_name
      gene_product
      alt_protein_names
      description
    }
  }
  getAssociatedSequnces(gene: $gene) {
    id
    name
    associated_sequences {
      genbank_genomic_fragment {
        name
        link
      }
      genbank_mrna {
        name
        link
      }
      ests {
        name
        link
      }
      more_link
    }
  }
  getLinks(gene: $gene) {
    id
    name
    links {
      expression {
        name
        link
      }
      colleagues {
        name
        link
      }
      ext_resources {
        name
        link
      }
    }
  }
  getProteinInformation(gene: $gene) {
    id
    name
    protein_information {
      general_info {
        gene_product
        dictybase_id
        description
        protein_length
        molecular_weight
        aa_composition {
          name
          link
        }
        subcellular_location
        protein_existence
        note
      }
      external_links {
        name
        link
      }
      protein_sequence
    }
  }
}
    `;

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
export function useGeneQuery(baseOptions: Apollo.QueryHookOptions<GeneQuery, GeneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneQuery, GeneQueryVariables>(GeneDocument, options);
      }
export function useGeneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneQuery, GeneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneQuery, GeneQueryVariables>(GeneDocument, options);
        }
export type GeneQueryHookResult = ReturnType<typeof useGeneQuery>;
export type GeneLazyQueryHookResult = ReturnType<typeof useGeneLazyQuery>;
export type GeneQueryResult = Apollo.QueryResult<GeneQuery, GeneQueryVariables>;
export const ListRecentGenesDocument = gql`
    query ListRecentGenes($limit: Int! = 4) {
  listRecentGenes(limit: $limit) {
    id
    name
  }
}
    `;

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
export function useListRecentGenesQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentGenesQuery, ListRecentGenesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRecentGenesQuery, ListRecentGenesQueryVariables>(ListRecentGenesDocument, options);
      }
export function useListRecentGenesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentGenesQuery, ListRecentGenesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRecentGenesQuery, ListRecentGenesQueryVariables>(ListRecentGenesDocument, options);
        }
export type ListRecentGenesQueryHookResult = ReturnType<typeof useListRecentGenesQuery>;
export type ListRecentGenesLazyQueryHookResult = ReturnType<typeof useListRecentGenesLazyQuery>;
export type ListRecentGenesQueryResult = Apollo.QueryResult<ListRecentGenesQuery, ListRecentGenesQueryVariables>;
export const PublicationDocument = gql`
    query Publication($id: ID!) {
  publication(id: $id) {
    id
    doi
    title
    abstract
    journal
    pub_date
    pages
    issue
    volume
    authors {
      initials
      last_name
    }
  }
}
    `;

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
export function usePublicationQuery(baseOptions: Apollo.QueryHookOptions<PublicationQuery, PublicationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicationQuery, PublicationQueryVariables>(PublicationDocument, options);
      }
export function usePublicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationQuery, PublicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicationQuery, PublicationQueryVariables>(PublicationDocument, options);
        }
export type PublicationQueryHookResult = ReturnType<typeof usePublicationQuery>;
export type PublicationLazyQueryHookResult = ReturnType<typeof usePublicationLazyQuery>;
export type PublicationQueryResult = Apollo.QueryResult<PublicationQuery, PublicationQueryVariables>;
export const ListRecentPublicationsDocument = gql`
    query ListRecentPublications($limit: Int! = 4) {
  listRecentPublications(limit: $limit) {
    id
    doi
    title
    abstract
    journal
    pub_date
    pages
    issue
    volume
    authors {
      initials
      last_name
    }
  }
}
    `;

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
export function useListRecentPublicationsQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>(ListRecentPublicationsDocument, options);
      }
export function useListRecentPublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>(ListRecentPublicationsDocument, options);
        }
export type ListRecentPublicationsQueryHookResult = ReturnType<typeof useListRecentPublicationsQuery>;
export type ListRecentPublicationsLazyQueryHookResult = ReturnType<typeof useListRecentPublicationsLazyQuery>;
export type ListRecentPublicationsQueryResult = Apollo.QueryResult<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>;
export const StrainListDocument = gql`
    query StrainList($cursor: Int!, $limit: Int!, $filter: StrainListFilter) {
  listStrains(cursor: $cursor, limit: $limit, filter: $filter) {
    nextCursor
    totalCount
    strains {
      id
      label
      summary
      in_stock
    }
  }
}
    `;

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
export function useStrainListQuery(baseOptions: Apollo.QueryHookOptions<StrainListQuery, StrainListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StrainListQuery, StrainListQueryVariables>(StrainListDocument, options);
      }
export function useStrainListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StrainListQuery, StrainListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StrainListQuery, StrainListQueryVariables>(StrainListDocument, options);
        }
export type StrainListQueryHookResult = ReturnType<typeof useStrainListQuery>;
export type StrainListLazyQueryHookResult = ReturnType<typeof useStrainListLazyQuery>;
export type StrainListQueryResult = Apollo.QueryResult<StrainListQuery, StrainListQueryVariables>;
export const ListStrainsWithPhenotypeDocument = gql`
    query ListStrainsWithPhenotype($cursor: Int!, $limit: Int!, $type: String!, $annotation: String!) {
  listStrainsWithAnnotation(
    cursor: $cursor
    limit: $limit
    type: $type
    annotation: $annotation
  ) {
    totalCount
    nextCursor
    strains {
      id
      label
      genes {
        name
      }
      publications {
        id
        pub_date
        title
        journal
        volume
        pages
        authors {
          last_name
        }
      }
    }
  }
}
    `;

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
export function useListStrainsWithPhenotypeQuery(baseOptions: Apollo.QueryHookOptions<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>(ListStrainsWithPhenotypeDocument, options);
      }
export function useListStrainsWithPhenotypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>(ListStrainsWithPhenotypeDocument, options);
        }
export type ListStrainsWithPhenotypeQueryHookResult = ReturnType<typeof useListStrainsWithPhenotypeQuery>;
export type ListStrainsWithPhenotypeLazyQueryHookResult = ReturnType<typeof useListStrainsWithPhenotypeLazyQuery>;
export type ListStrainsWithPhenotypeQueryResult = Apollo.QueryResult<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>;
export const ListBacterialStrainsDocument = gql`
    query ListBacterialStrains {
  bacterialFoodSource: listStrainsWithAnnotation(
    cursor: 0
    limit: 100
    type: "characteristic"
    annotation: "bacterial food source"
  ) {
    totalCount
    nextCursor
    strains {
      id
      label
      summary
      in_stock
    }
  }
  symbioticFarmerBacterium: listStrainsWithAnnotation(
    cursor: 0
    limit: 100
    type: "characteristic"
    annotation: "symbiotic farmer bacterium"
  ) {
    totalCount
    nextCursor
    strains {
      id
      label
      summary
      in_stock
    }
  }
}
    `;

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
export function useListBacterialStrainsQuery(baseOptions?: Apollo.QueryHookOptions<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>(ListBacterialStrainsDocument, options);
      }
export function useListBacterialStrainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>(ListBacterialStrainsDocument, options);
        }
export type ListBacterialStrainsQueryHookResult = ReturnType<typeof useListBacterialStrainsQuery>;
export type ListBacterialStrainsLazyQueryHookResult = ReturnType<typeof useListBacterialStrainsLazyQuery>;
export type ListBacterialStrainsQueryResult = Apollo.QueryResult<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>;
export const ListStrainsInventoryDocument = gql`
    query ListStrainsInventory($cursor: Int!, $limit: Int!) {
  listStrainsWithAnnotation(
    cursor: $cursor
    limit: $limit
    type: "strain_inventory"
    annotation: "strain_inventory"
  ) {
    totalCount
    nextCursor
    strains {
      id
      label
      summary
      in_stock
    }
  }
}
    `;

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
export function useListStrainsInventoryQuery(baseOptions: Apollo.QueryHookOptions<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>(ListStrainsInventoryDocument, options);
      }
export function useListStrainsInventoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>(ListStrainsInventoryDocument, options);
        }
export type ListStrainsInventoryQueryHookResult = ReturnType<typeof useListStrainsInventoryQuery>;
export type ListStrainsInventoryLazyQueryHookResult = ReturnType<typeof useListStrainsInventoryLazyQuery>;
export type ListStrainsInventoryQueryResult = Apollo.QueryResult<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>;
export const ListPlasmidsInventoryDocument = gql`
    query ListPlasmidsInventory($cursor: Int!, $limit: Int!) {
  listPlasmidsWithAnnotation(
    cursor: $cursor
    limit: $limit
    type: "plasmid_inventory"
    annotation: "plasmid inventory"
  ) {
    totalCount
    nextCursor
    plasmids {
      id
      name
      summary
      in_stock
    }
  }
}
    `;

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
export function useListPlasmidsInventoryQuery(baseOptions: Apollo.QueryHookOptions<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>(ListPlasmidsInventoryDocument, options);
      }
export function useListPlasmidsInventoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>(ListPlasmidsInventoryDocument, options);
        }
export type ListPlasmidsInventoryQueryHookResult = ReturnType<typeof useListPlasmidsInventoryQuery>;
export type ListPlasmidsInventoryLazyQueryHookResult = ReturnType<typeof useListPlasmidsInventoryLazyQuery>;
export type ListPlasmidsInventoryQueryResult = Apollo.QueryResult<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>;
export const PlasmidListFilterDocument = gql`
    query PlasmidListFilter($cursor: Int!, $limit: Int!, $filter: String!) {
  listPlasmids(cursor: $cursor, limit: $limit, filter: $filter) {
    nextCursor
    totalCount
    plasmids {
      id
      name
      summary
      in_stock
    }
  }
}
    `;

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
export function usePlasmidListFilterQuery(baseOptions: Apollo.QueryHookOptions<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>(PlasmidListFilterDocument, options);
      }
export function usePlasmidListFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>(PlasmidListFilterDocument, options);
        }
export type PlasmidListFilterQueryHookResult = ReturnType<typeof usePlasmidListFilterQuery>;
export type PlasmidListFilterLazyQueryHookResult = ReturnType<typeof usePlasmidListFilterLazyQuery>;
export type PlasmidListFilterQueryResult = Apollo.QueryResult<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>;
export const PlasmidDocument = gql`
    query Plasmid($id: ID!) {
  plasmid(id: $id) {
    id
    name
    summary
    depositor {
      first_name
      last_name
    }
    publications {
      id
      pub_date
      title
      journal
      volume
      pages
      doi
      authors {
        last_name
      }
    }
    dbxrefs
    genes {
      name
    }
    image_map
    sequence
    keywords
    genbank_accession
    in_stock
  }
}
    `;

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
export function usePlasmidQuery(baseOptions: Apollo.QueryHookOptions<PlasmidQuery, PlasmidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlasmidQuery, PlasmidQueryVariables>(PlasmidDocument, options);
      }
export function usePlasmidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlasmidQuery, PlasmidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlasmidQuery, PlasmidQueryVariables>(PlasmidDocument, options);
        }
export type PlasmidQueryHookResult = ReturnType<typeof usePlasmidQuery>;
export type PlasmidLazyQueryHookResult = ReturnType<typeof usePlasmidLazyQuery>;
export type PlasmidQueryResult = Apollo.QueryResult<PlasmidQuery, PlasmidQueryVariables>;
export const StrainDocument = gql`
    query Strain($id: ID!) {
  strain(id: $id) {
    id
    label
    summary
    species
    parent {
      id
      label
    }
    depositor {
      first_name
      last_name
    }
    plasmid
    dbxrefs
    publications {
      id
      pub_date
      title
      journal
      volume
      pages
      doi
      authors {
        last_name
      }
    }
    genes {
      name
    }
    in_stock
    systematic_name
    genotypes
    mutagenesis_method
    genetic_modification
    names
    characteristics
    phenotypes {
      phenotype
      note
      assay
      environment
      publication {
        id
        pub_date
        title
        journal
        volume
        pages
        authors {
          last_name
        }
      }
    }
  }
}
    `;

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
export function useStrainQuery(baseOptions: Apollo.QueryHookOptions<StrainQuery, StrainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StrainQuery, StrainQueryVariables>(StrainDocument, options);
      }
export function useStrainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StrainQuery, StrainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StrainQuery, StrainQueryVariables>(StrainDocument, options);
        }
export type StrainQueryHookResult = ReturnType<typeof useStrainQuery>;
export type StrainLazyQueryHookResult = ReturnType<typeof useStrainLazyQuery>;
export type StrainQueryResult = Apollo.QueryResult<StrainQuery, StrainQueryVariables>;
export const ListRecentPlasmidsDocument = gql`
    query ListRecentPlasmids($limit: Int! = 4) {
  listRecentPlasmids(limit: $limit) {
    id
    created_at
    name
  }
}
    `;

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
export function useListRecentPlasmidsQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>(ListRecentPlasmidsDocument, options);
      }
export function useListRecentPlasmidsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>(ListRecentPlasmidsDocument, options);
        }
export type ListRecentPlasmidsQueryHookResult = ReturnType<typeof useListRecentPlasmidsQuery>;
export type ListRecentPlasmidsLazyQueryHookResult = ReturnType<typeof useListRecentPlasmidsLazyQuery>;
export type ListRecentPlasmidsQueryResult = Apollo.QueryResult<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>;
export const ListRecentStrainsDocument = gql`
    query ListRecentStrains($limit: Int! = 4) {
  listRecentStrains(limit: $limit) {
    id
    created_at
    systematic_name
  }
}
    `;

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
export function useListRecentStrainsQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>(ListRecentStrainsDocument, options);
      }
export function useListRecentStrainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>(ListRecentStrainsDocument, options);
        }
export type ListRecentStrainsQueryHookResult = ReturnType<typeof useListRecentStrainsQuery>;
export type ListRecentStrainsLazyQueryHookResult = ReturnType<typeof useListRecentStrainsLazyQuery>;
export type ListRecentStrainsQueryResult = Apollo.QueryResult<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>;
export const UserByEmailDocument = gql`
    query UserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
  }
}
    `;

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
export function useUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<UserByEmailQuery, UserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByEmailQuery, UserByEmailQueryVariables>(UserByEmailDocument, options);
      }
export function useUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByEmailQuery, UserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByEmailQuery, UserByEmailQueryVariables>(UserByEmailDocument, options);
        }
export type UserByEmailQueryHookResult = ReturnType<typeof useUserByEmailQuery>;
export type UserByEmailLazyQueryHookResult = ReturnType<typeof useUserByEmailLazyQuery>;
export type UserByEmailQueryResult = Apollo.QueryResult<UserByEmailQuery, UserByEmailQueryVariables>;