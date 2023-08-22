import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import { graphql, ResponseResolver, GraphQLRequest, GraphQLContext } from 'msw'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamp: { input: any; output: any; }
};

export type AssociatedSequences = {
  __typename?: 'AssociatedSequences';
  ests: Array<NameWithLink>;
  genbank_genomic_fragment?: Maybe<NameWithLink>;
  genbank_mrna?: Maybe<NameWithLink>;
  more_link: Scalars['String']['output'];
};

export type Auth = {
  __typename?: 'Auth';
  identity: Identity;
  token: Scalars['String']['output'];
  user: User;
};

export type Author = {
  __typename?: 'Author';
  first_name?: Maybe<Scalars['String']['output']>;
  initials?: Maybe<Scalars['String']['output']>;
  last_name: Scalars['String']['output'];
  rank?: Maybe<Scalars['String']['output']>;
};

export type BasePublication = {
  abstract: Scalars['String']['output'];
  authors: Array<Author>;
  doi?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  issn?: Maybe<Scalars['String']['output']>;
  issue?: Maybe<Scalars['String']['output']>;
  journal: Scalars['String']['output'];
  pages?: Maybe<Scalars['String']['output']>;
  pub_date?: Maybe<Scalars['Timestamp']['output']>;
  pub_type: Scalars['String']['output'];
  source: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  volume?: Maybe<Scalars['String']['output']>;
};

export type Citation = {
  __typename?: 'Citation';
  authors: Scalars['String']['output'];
  journal: Scalars['String']['output'];
  pubmed_id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Content = {
  __typename?: 'Content';
  content: Scalars['String']['output'];
  created_at: Scalars['Timestamp']['output'];
  created_by: User;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  namespace: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updated_at: Scalars['Timestamp']['output'];
  updated_by: User;
};

export type CreateContentInput = {
  content: Scalars['String']['input'];
  created_by: Scalars['String']['input'];
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

export type CreateOrderInput = {
  comments?: InputMaybe<Scalars['String']['input']>;
  consumer: Scalars['String']['input'];
  courier: Scalars['String']['input'];
  courier_account: Scalars['String']['input'];
  items: Array<Scalars['String']['input']>;
  payer: Scalars['String']['input'];
  payment: Scalars['String']['input'];
  purchase_order_num?: InputMaybe<Scalars['String']['input']>;
  purchaser: Scalars['String']['input'];
  status: StatusEnum;
};

export type CreatePermissionInput = {
  description: Scalars['String']['input'];
  permission: Scalars['String']['input'];
  resource: Scalars['String']['input'];
};

export type CreatePlasmidInput = {
  created_by: Scalars['String']['input'];
  dbxrefs?: InputMaybe<Array<Scalars['String']['input']>>;
  depositor?: InputMaybe<Scalars['String']['input']>;
  editable_summary?: InputMaybe<Scalars['String']['input']>;
  genbank_accession?: InputMaybe<Scalars['String']['input']>;
  genes?: InputMaybe<Array<Scalars['String']['input']>>;
  image_map?: InputMaybe<Scalars['String']['input']>;
  in_stock: Scalars['Boolean']['input'];
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  publications?: InputMaybe<Array<Scalars['String']['input']>>;
  sequence?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  updated_by: Scalars['String']['input'];
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type CreateStrainInput = {
  characteristics?: InputMaybe<Array<Scalars['String']['input']>>;
  created_by: Scalars['String']['input'];
  dbxrefs?: InputMaybe<Array<Scalars['String']['input']>>;
  depositor?: InputMaybe<Scalars['String']['input']>;
  editable_summary?: InputMaybe<Scalars['String']['input']>;
  genes?: InputMaybe<Array<Scalars['String']['input']>>;
  genetic_modification?: InputMaybe<Scalars['String']['input']>;
  genotypes?: InputMaybe<Array<Scalars['String']['input']>>;
  in_stock: Scalars['Boolean']['input'];
  label: Scalars['String']['input'];
  mutagenesis_method?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  parent?: InputMaybe<Scalars['String']['input']>;
  phenotypes?: InputMaybe<Array<Scalars['String']['input']>>;
  plasmid?: InputMaybe<Scalars['String']['input']>;
  publications?: InputMaybe<Array<Scalars['String']['input']>>;
  species: Scalars['String']['input'];
  summary?: InputMaybe<Scalars['String']['input']>;
  systematic_name: Scalars['String']['input'];
  updated_by: Scalars['String']['input'];
};

export type CreateUserInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  first_address?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  group_name?: InputMaybe<Scalars['String']['input']>;
  is_active: Scalars['Boolean']['input'];
  last_name: Scalars['String']['input'];
  organization?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  second_address?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteContent = {
  __typename?: 'DeleteContent';
  success: Scalars['Boolean']['output'];
};

export type DeletePermission = {
  __typename?: 'DeletePermission';
  success: Scalars['Boolean']['output'];
};

export type DeleteRole = {
  __typename?: 'DeleteRole';
  success: Scalars['Boolean']['output'];
};

export type DeleteStock = {
  __typename?: 'DeleteStock';
  success: Scalars['Boolean']['output'];
};

export type DeleteUser = {
  __typename?: 'DeleteUser';
  success: Scalars['Boolean']['output'];
};

export type Download = {
  __typename?: 'Download';
  items: Array<DownloadItem>;
  title: Scalars['String']['output'];
};

export type DownloadItem = {
  __typename?: 'DownloadItem';
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Extension = {
  __typename?: 'Extension';
  db: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  relation: Scalars['String']['output'];
};

export type GoAnnotation = {
  __typename?: 'GOAnnotation';
  assigned_by: Scalars['String']['output'];
  date: Scalars['String']['output'];
  evidence_code: Scalars['String']['output'];
  extensions?: Maybe<Array<Extension>>;
  go_term: Scalars['String']['output'];
  id: Scalars['String']['output'];
  publication: Scalars['String']['output'];
  qualifier: Scalars['String']['output'];
  type: Scalars['String']['output'];
  with?: Maybe<Array<With>>;
};

export type Gene = {
  __typename?: 'Gene';
  associated_sequences: AssociatedSequences;
  general_info: GeneralInfo;
  goas?: Maybe<Array<GoAnnotation>>;
  id: Scalars['String']['output'];
  links: Links;
  name: Scalars['String']['output'];
  orthologs?: Maybe<Array<Orthologs>>;
  product_info?: Maybe<Array<ProductInformation>>;
  protein_information?: Maybe<ProteinInformation>;
  strains?: Maybe<Array<Strain>>;
};

export type GeneralInfo = {
  __typename?: 'GeneralInfo';
  alt_gene_name?: Maybe<Array<Scalars['String']['output']>>;
  alt_protein_names?: Maybe<Array<Scalars['String']['output']>>;
  description: Scalars['String']['output'];
  gene_product: Scalars['String']['output'];
  name_description: Array<Scalars['String']['output']>;
};

export type GenomicCoordinates = {
  __typename?: 'GenomicCoordinates';
  chrom_coords: Scalars['String']['output'];
  exon: Scalars['String']['output'];
  local_coords: Scalars['String']['output'];
};

export type Identity = {
  __typename?: 'Identity';
  created_at: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  updated_at: Scalars['Timestamp']['output'];
  user_id: Scalars['ID']['output'];
};

export type Links = {
  __typename?: 'Links';
  colleagues: NameWithLink;
  expression: Array<NameWithLink>;
  ext_resources: Array<NameWithLink>;
};

export type LoginInput = {
  client_id: Scalars['String']['input'];
  code: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  redirect_url: Scalars['String']['input'];
  scopes: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type Logout = {
  __typename?: 'Logout';
  success: Scalars['Boolean']['output'];
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
  permissionId: Scalars['ID']['input'];
  roleId: Scalars['ID']['input'];
};


export type MutationCreateStrainArgs = {
  input?: InputMaybe<CreateStrainInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationCreateUserRoleRelationshipArgs = {
  roleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePermissionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStockArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationUpdateContentArgs = {
  input?: InputMaybe<UpdateContentInput>;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UpdateOrderInput>;
};


export type MutationUpdatePermissionArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UpdatePermissionInput>;
};


export type MutationUpdatePlasmidArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UpdatePlasmidInput>;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UpdateRoleInput>;
};


export type MutationUpdateStrainArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UpdateStrainInput>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UpdateUserInput>;
};

export type NameWithLink = {
  __typename?: 'NameWithLink';
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type NumberOfPublicationsWithGene = {
  __typename?: 'NumberOfPublicationsWithGene';
  num_pubs: Scalars['Int']['output'];
  publications: Array<PublicationWithGene>;
};

export type Order = {
  __typename?: 'Order';
  comments?: Maybe<Scalars['String']['output']>;
  consumer?: Maybe<User>;
  courier?: Maybe<Scalars['String']['output']>;
  courier_account?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Stock>>;
  payer?: Maybe<User>;
  payment?: Maybe<Scalars['String']['output']>;
  purchase_order_num?: Maybe<Scalars['String']['output']>;
  purchaser?: Maybe<User>;
  status?: Maybe<StatusEnum>;
  updated_at: Scalars['Timestamp']['output'];
};

export type OrderListWithCursor = {
  __typename?: 'OrderListWithCursor';
  limit?: Maybe<Scalars['Int']['output']>;
  nextCursor: Scalars['Int']['output'];
  orders: Array<Order>;
  previousCursor: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Organism = {
  __typename?: 'Organism';
  citations: Array<Citation>;
  downloads: Array<Download>;
  scientific_name: Scalars['String']['output'];
  taxon_id: Scalars['String']['output'];
};

export type Orthologs = {
  __typename?: 'Orthologs';
  gene_product: Scalars['String']['output'];
  id: NameWithLink;
  source: Array<Scalars['String']['output']>;
  species: Scalars['String']['output'];
  uniprotkb: NameWithLink;
};

export type Permission = {
  __typename?: 'Permission';
  created_at: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  permission: Scalars['String']['output'];
  resource?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['Timestamp']['output'];
};

export type Phenotype = {
  __typename?: 'Phenotype';
  assay?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  phenotype: Scalars['String']['output'];
  publication?: Maybe<Publication>;
};

export type Plasmid = Stock & {
  __typename?: 'Plasmid';
  created_at: Scalars['Timestamp']['output'];
  created_by: User;
  dbxrefs?: Maybe<Array<Scalars['String']['output']>>;
  depositor: User;
  editable_summary?: Maybe<Scalars['String']['output']>;
  genbank_accession?: Maybe<Scalars['String']['output']>;
  genes?: Maybe<Array<Gene>>;
  id: Scalars['ID']['output'];
  image_map?: Maybe<Scalars['String']['output']>;
  in_stock: Scalars['Boolean']['output'];
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
  publications?: Maybe<Array<Publication>>;
  sequence?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['Timestamp']['output'];
  updated_by: User;
};

export type PlasmidListWithCursor = {
  __typename?: 'PlasmidListWithCursor';
  limit?: Maybe<Scalars['Int']['output']>;
  nextCursor: Scalars['Int']['output'];
  plasmids: Array<Plasmid>;
  previousCursor: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ProductInformation = {
  __typename?: 'ProductInformation';
  genomic_coords: Array<GenomicCoordinates>;
  more_protein_data: Scalars['String']['output'];
  protein_coding_gene: NameWithLink;
  protein_length: Scalars['String']['output'];
  protein_molecular_weight: Scalars['String']['output'];
};

export type ProteinGeneralInfo = {
  __typename?: 'ProteinGeneralInfo';
  aa_composition: NameWithLink;
  description: Scalars['String']['output'];
  dictybase_id: Scalars['String']['output'];
  gene_product: Scalars['String']['output'];
  molecular_weight: Scalars['String']['output'];
  note: Scalars['String']['output'];
  protein_existence: Scalars['String']['output'];
  protein_length: Scalars['String']['output'];
  subcellular_location: Scalars['String']['output'];
};

export type ProteinInformation = {
  __typename?: 'ProteinInformation';
  external_links: Array<NameWithLink>;
  general_info: ProteinGeneralInfo;
  protein_sequence: Scalars['String']['output'];
};

export type Publication = BasePublication & {
  __typename?: 'Publication';
  abstract: Scalars['String']['output'];
  authors: Array<Author>;
  doi?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  issn?: Maybe<Scalars['String']['output']>;
  issue?: Maybe<Scalars['String']['output']>;
  journal: Scalars['String']['output'];
  pages?: Maybe<Scalars['String']['output']>;
  pub_date?: Maybe<Scalars['Timestamp']['output']>;
  pub_type: Scalars['String']['output'];
  source: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  volume?: Maybe<Scalars['String']['output']>;
};

export type PublicationWithGene = BasePublication & {
  __typename?: 'PublicationWithGene';
  abstract: Scalars['String']['output'];
  authors: Array<Author>;
  doi?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  issn?: Maybe<Scalars['String']['output']>;
  issue?: Maybe<Scalars['String']['output']>;
  journal: Scalars['String']['output'];
  pages?: Maybe<Scalars['String']['output']>;
  pub_date?: Maybe<Scalars['Timestamp']['output']>;
  pub_type: Scalars['String']['output'];
  related_genes: Array<Gene>;
  source: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  volume?: Maybe<Scalars['String']['output']>;
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
  listContent?: Maybe<Array<Content>>;
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
  gene: Scalars['String']['input'];
};


export type QueryAllPublicationsArgs = {
  gene: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAllStrainsArgs = {
  gene: Scalars['String']['input'];
};


export type QueryContentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContentBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGeneArgs = {
  gene: Scalars['String']['input'];
};


export type QueryGeneralInformationArgs = {
  gene: Scalars['String']['input'];
};


export type QueryGetAssociatedSequncesArgs = {
  gene: Scalars['String']['input'];
};


export type QueryGetLinksArgs = {
  gene: Scalars['String']['input'];
};


export type QueryGetProteinInformationArgs = {
  gene: Scalars['String']['input'];
};


export type QueryGetRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryListContentArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryListGeneProductInfoArgs = {
  gene: Scalars['String']['input'];
};


export type QueryListOrdersArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryListPlasmidsArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryListPlasmidsWithAnnotationArgs = {
  annotation: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};


export type QueryListRecentGenesArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryListRecentPlasmidsArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryListRecentPublicationsArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryListRecentStrainsArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryListStrainsArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<StrainListFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryListStrainsWithAnnotationArgs = {
  annotation: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};


export type QueryListUsersArgs = {
  filter: Scalars['String']['input'];
  pagenum: Scalars['String']['input'];
  pagesize: Scalars['String']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrganismArgs = {
  taxon_id: Scalars['String']['input'];
};


export type QueryPermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPlasmidArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPublicationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStrainArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  created_at: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  permissions?: Maybe<Array<Permission>>;
  role: Scalars['String']['output'];
  updated_at: Scalars['Timestamp']['output'];
};

export enum StatusEnum {
  Cancelled = 'CANCELLED',
  Growing = 'GROWING',
  InPreparation = 'IN_PREPARATION',
  Shipped = 'SHIPPED'
}

export type Stock = {
  created_at: Scalars['Timestamp']['output'];
  created_by: User;
  dbxrefs?: Maybe<Array<Scalars['String']['output']>>;
  depositor: User;
  editable_summary?: Maybe<Scalars['String']['output']>;
  genes?: Maybe<Array<Gene>>;
  id: Scalars['ID']['output'];
  in_stock: Scalars['Boolean']['output'];
  publications?: Maybe<Array<Publication>>;
  summary?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['Timestamp']['output'];
  updated_by: User;
};

export type Strain = Stock & {
  __typename?: 'Strain';
  characteristics?: Maybe<Array<Scalars['String']['output']>>;
  created_at: Scalars['Timestamp']['output'];
  created_by: User;
  dbxrefs?: Maybe<Array<Scalars['String']['output']>>;
  depositor: User;
  editable_summary?: Maybe<Scalars['String']['output']>;
  genes?: Maybe<Array<Gene>>;
  genetic_modification?: Maybe<Scalars['String']['output']>;
  genotypes?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  in_stock: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  mutagenesis_method?: Maybe<Scalars['String']['output']>;
  names?: Maybe<Array<Scalars['String']['output']>>;
  parent?: Maybe<Strain>;
  phenotypes?: Maybe<Array<Phenotype>>;
  plasmid?: Maybe<Scalars['String']['output']>;
  publications?: Maybe<Array<Publication>>;
  species: Scalars['String']['output'];
  summary?: Maybe<Scalars['String']['output']>;
  systematic_name: Scalars['String']['output'];
  updated_at: Scalars['Timestamp']['output'];
  updated_by: User;
};

export type StrainListFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  in_stock?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  strain_type: StrainType;
  summary?: InputMaybe<Scalars['String']['input']>;
};

export type StrainListWithCursor = {
  __typename?: 'StrainListWithCursor';
  limit?: Maybe<Scalars['Int']['output']>;
  nextCursor: Scalars['Int']['output'];
  previousCursor: Scalars['Int']['output'];
  strains: Array<Strain>;
  totalCount: Scalars['Int']['output'];
};

export enum StrainType {
  All = 'ALL',
  Bacterial = 'BACTERIAL',
  Gwdi = 'GWDI',
  Regular = 'REGULAR'
}

export type UpdateContentInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  updated_by: Scalars['String']['input'];
};

export type UpdateOrderInput = {
  comments?: InputMaybe<Scalars['String']['input']>;
  courier?: InputMaybe<Scalars['String']['input']>;
  courier_account?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<Scalars['String']['input']>>;
  payment?: InputMaybe<Scalars['String']['input']>;
  purchase_order_num?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StatusEnum>;
};

export type UpdatePermissionInput = {
  description: Scalars['String']['input'];
  permission: Scalars['String']['input'];
  resource: Scalars['String']['input'];
};

export type UpdatePlasmidInput = {
  dbxrefs?: InputMaybe<Array<Scalars['String']['input']>>;
  depositor?: InputMaybe<Scalars['String']['input']>;
  editable_summary?: InputMaybe<Scalars['String']['input']>;
  genbank_accession?: InputMaybe<Scalars['String']['input']>;
  genes?: InputMaybe<Array<Scalars['String']['input']>>;
  image_map?: InputMaybe<Scalars['String']['input']>;
  in_stock?: InputMaybe<Scalars['Boolean']['input']>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  publications?: InputMaybe<Array<Scalars['String']['input']>>;
  sequence?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  updated_by: Scalars['String']['input'];
};

export type UpdateRoleInput = {
  description: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type UpdateStrainInput = {
  characteristics?: InputMaybe<Array<Scalars['String']['input']>>;
  dbxrefs?: InputMaybe<Array<Scalars['String']['input']>>;
  depositor?: InputMaybe<Scalars['String']['input']>;
  editable_summary?: InputMaybe<Scalars['String']['input']>;
  genes?: InputMaybe<Array<Scalars['String']['input']>>;
  genetic_modification?: InputMaybe<Scalars['String']['input']>;
  genotypes?: InputMaybe<Array<Scalars['String']['input']>>;
  in_stock?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  mutagenesis_method?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  parent?: InputMaybe<Scalars['String']['input']>;
  phenotypes?: InputMaybe<Array<Scalars['String']['input']>>;
  plasmid?: InputMaybe<Scalars['String']['input']>;
  publications?: InputMaybe<Array<Scalars['String']['input']>>;
  species?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  systematic_name?: InputMaybe<Scalars['String']['input']>;
  updated_by: Scalars['String']['input'];
};

export type UpdateUserInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  first_address?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  group_name?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  second_address?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  first_address?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  group_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  last_name: Scalars['String']['output'];
  organization?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Role>>;
  second_address?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['Timestamp']['output'];
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type UserList = {
  __typename?: 'UserList';
  pageNum?: Maybe<Scalars['String']['output']>;
  pageSize?: Maybe<Scalars['String']['output']>;
  totalCount: Scalars['Int']['output'];
  users: Array<User>;
};

export type With = {
  __typename?: 'With';
  db: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string } | null };

export type GetRefreshTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetRefreshTokenQuery = { __typename?: 'Query', getRefreshToken?: { __typename?: 'Auth', token: string, user: { __typename?: 'User', id: string, email: string, first_name: string, last_name: string, roles?: Array<{ __typename?: 'Role', role: string, permissions?: Array<{ __typename?: 'Permission', permission: string, resource?: string | null }> | null }> | null }, identity: { __typename?: 'Identity', provider: string } } | null };

export type ContentBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ContentBySlugQuery = { __typename?: 'Query', contentBySlug?: { __typename?: 'Content', id: string, content: string, name: string, slug: string, updated_at: any, updated_by: { __typename?: 'User', id: string, email: string, first_name: string, last_name: string, roles?: Array<{ __typename?: 'Role', role: string, permissions?: Array<{ __typename?: 'Permission', permission: string, resource?: string | null }> | null }> | null } } | null };

export type ContentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ContentQuery = { __typename?: 'Query', content?: { __typename?: 'Content', id: string, content: string, name: string, slug: string, namespace: string, updated_at: any, updated_by: { __typename?: 'User', id: string, email: string, first_name: string, last_name: string, roles?: Array<{ __typename?: 'Role', role: string, permissions?: Array<{ __typename?: 'Permission', permission: string, resource?: string | null }> | null }> | null } } | null };

export type ListNewsContentQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type ListNewsContentQuery = { __typename?: 'Query', listContent?: Array<{ __typename?: 'Content', id: string, slug: string, content: string, name: string, updated_at: any, updated_by: { __typename?: 'User', first_name: string, last_name: string } }> | null };

export type ListOrganismsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListOrganismsQuery = { __typename?: 'Query', listOrganisms?: Array<{ __typename?: 'Organism', taxon_id: string, scientific_name: string, citations: Array<{ __typename?: 'Citation', title: string, authors: string, pubmed_id: string, journal: string }>, downloads: Array<{ __typename?: 'Download', title: string, items: Array<{ __typename?: 'DownloadItem', title: string, url: string }> }> }> | null };

export type GeneQueryVariables = Exact<{
  gene: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
}>;


export type GeneQuery = { __typename?: 'Query', allStrains?: { __typename?: 'Gene', id: string, name: string, strains?: Array<{ __typename?: 'Strain', id: string, label: string, characteristics?: Array<string> | null, in_stock: boolean, phenotypes?: Array<{ __typename?: 'Phenotype', phenotype: string, publication?: { __typename?: 'Publication', id: string, title: string, journal: string, pages?: string | null, volume?: string | null, pub_date?: any | null, authors: Array<{ __typename?: 'Author', last_name: string, rank?: string | null }> } | null }> | null }> | null } | null, gene?: { __typename?: 'Gene', id: string, name: string, goas?: Array<{ __typename?: 'GOAnnotation', id: string, type: string, date: string, evidence_code: string, go_term: string, qualifier: string, publication: string, assigned_by: string, with?: Array<{ __typename?: 'With', id: string, db: string, name: string }> | null, extensions?: Array<{ __typename?: 'Extension', id: string, db: string, relation: string, name: string }> | null }> | null } | null, allPublications: { __typename?: 'NumberOfPublicationsWithGene', num_pubs: number, publications: Array<{ __typename?: 'PublicationWithGene', id: string, doi?: string | null, title: string, journal: string, pub_date?: any | null, volume?: string | null, pages?: string | null, pub_type: string, source: string, issue?: string | null, related_genes: Array<{ __typename?: 'Gene', id: string, name: string }>, authors: Array<{ __typename?: 'Author', last_name: string, rank?: string | null }> }> }, allOrthologs?: { __typename?: 'Gene', id: string, name: string, orthologs?: Array<{ __typename?: 'Orthologs', species: string, gene_product: string, source: Array<string>, id: { __typename?: 'NameWithLink', name: string, link: string }, uniprotkb: { __typename?: 'NameWithLink', name: string, link: string } }> | null } | null, listGeneProductInfo?: { __typename?: 'Gene', id: string, name: string, product_info?: Array<{ __typename?: 'ProductInformation', protein_length: string, protein_molecular_weight: string, more_protein_data: string, protein_coding_gene: { __typename?: 'NameWithLink', name: string, link: string }, genomic_coords: Array<{ __typename?: 'GenomicCoordinates', exon: string, local_coords: string, chrom_coords: string }> }> | null } | null, generalInformation?: { __typename?: 'Gene', id: string, name: string, general_info: { __typename?: 'GeneralInfo', name_description: Array<string>, alt_gene_name?: Array<string> | null, gene_product: string, alt_protein_names?: Array<string> | null, description: string } } | null, getAssociatedSequnces?: { __typename?: 'Gene', id: string, name: string, associated_sequences: { __typename?: 'AssociatedSequences', more_link: string, genbank_genomic_fragment?: { __typename?: 'NameWithLink', name: string, link: string } | null, genbank_mrna?: { __typename?: 'NameWithLink', name: string, link: string } | null, ests: Array<{ __typename?: 'NameWithLink', name: string, link: string }> } } | null, getLinks?: { __typename?: 'Gene', id: string, name: string, links: { __typename?: 'Links', expression: Array<{ __typename?: 'NameWithLink', name: string, link: string }>, colleagues: { __typename?: 'NameWithLink', name: string, link: string }, ext_resources: Array<{ __typename?: 'NameWithLink', name: string, link: string }> } } | null, getProteinInformation?: { __typename?: 'Gene', id: string, name: string, protein_information?: { __typename?: 'ProteinInformation', protein_sequence: string, general_info: { __typename?: 'ProteinGeneralInfo', gene_product: string, dictybase_id: string, description: string, protein_length: string, molecular_weight: string, subcellular_location: string, protein_existence: string, note: string, aa_composition: { __typename?: 'NameWithLink', name: string, link: string } }, external_links: Array<{ __typename?: 'NameWithLink', name: string, link: string }> } | null } | null };

export type ListRecentGenesQueryVariables = Exact<{
  limit?: Scalars['Int']['input'];
}>;


export type ListRecentGenesQuery = { __typename?: 'Query', listRecentGenes?: Array<{ __typename?: 'Gene', id: string, name: string }> | null };

export type PublicationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PublicationQuery = { __typename?: 'Query', publication?: { __typename?: 'Publication', id: string, doi?: string | null, title: string, abstract: string, journal: string, pub_date?: any | null, pages?: string | null, issue?: string | null, volume?: string | null, authors: Array<{ __typename?: 'Author', initials?: string | null, last_name: string }> } | null };

export type ListRecentPublicationsQueryVariables = Exact<{
  limit?: Scalars['Int']['input'];
}>;


export type ListRecentPublicationsQuery = { __typename?: 'Query', listRecentPublications?: Array<{ __typename?: 'Publication', id: string, doi?: string | null, title: string, abstract: string, journal: string, pub_date?: any | null, pages?: string | null, issue?: string | null, volume?: string | null, authors: Array<{ __typename?: 'Author', initials?: string | null, last_name: string }> }> | null };

export type StrainListQueryVariables = Exact<{
  cursor: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  filter?: InputMaybe<StrainListFilter>;
}>;


export type StrainListQuery = { __typename?: 'Query', listStrains?: { __typename?: 'StrainListWithCursor', nextCursor: number, totalCount: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, in_stock: boolean }> } | null };

export type ListStrainsWithPhenotypeQueryVariables = Exact<{
  cursor: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  annotation: Scalars['String']['input'];
}>;


export type ListStrainsWithPhenotypeQuery = { __typename?: 'Query', listStrainsWithAnnotation?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, genes?: Array<{ __typename?: 'Gene', name: string }> | null, publications?: Array<{ __typename?: 'Publication', id: string, pub_date?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, authors: Array<{ __typename?: 'Author', last_name: string }> }> | null }> } | null };

export type ListBacterialStrainsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListBacterialStrainsQuery = { __typename?: 'Query', bacterialFoodSource?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, in_stock: boolean }> } | null, symbioticFarmerBacterium?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, in_stock: boolean }> } | null };

export type ListStrainsInventoryQueryVariables = Exact<{
  cursor: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type ListStrainsInventoryQuery = { __typename?: 'Query', listStrainsWithAnnotation?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, in_stock: boolean }> } | null };

export type ListPlasmidsInventoryQueryVariables = Exact<{
  cursor: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type ListPlasmidsInventoryQuery = { __typename?: 'Query', listPlasmidsWithAnnotation?: { __typename?: 'PlasmidListWithCursor', totalCount: number, nextCursor: number, plasmids: Array<{ __typename?: 'Plasmid', id: string, name: string, summary?: string | null, in_stock: boolean }> } | null };

export type PlasmidListFilterQueryVariables = Exact<{
  cursor: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  filter: Scalars['String']['input'];
}>;


export type PlasmidListFilterQuery = { __typename?: 'Query', listPlasmids?: { __typename?: 'PlasmidListWithCursor', nextCursor: number, totalCount: number, plasmids: Array<{ __typename?: 'Plasmid', id: string, name: string, summary?: string | null, in_stock: boolean }> } | null };

export type PlasmidQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PlasmidQuery = { __typename?: 'Query', plasmid?: { __typename?: 'Plasmid', id: string, name: string, summary?: string | null, dbxrefs?: Array<string> | null, image_map?: string | null, sequence?: string | null, keywords?: Array<string> | null, genbank_accession?: string | null, in_stock: boolean, depositor: { __typename?: 'User', first_name: string, last_name: string }, publications?: Array<{ __typename?: 'Publication', id: string, pub_date?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Author', last_name: string }> }> | null, genes?: Array<{ __typename?: 'Gene', name: string }> | null } | null };

export type StrainQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StrainQuery = { __typename?: 'Query', strain?: { __typename?: 'Strain', id: string, label: string, summary?: string | null, species: string, plasmid?: string | null, dbxrefs?: Array<string> | null, in_stock: boolean, systematic_name: string, genotypes?: Array<string> | null, mutagenesis_method?: string | null, genetic_modification?: string | null, names?: Array<string> | null, characteristics?: Array<string> | null, parent?: { __typename?: 'Strain', id: string, label: string } | null, depositor: { __typename?: 'User', first_name: string, last_name: string }, publications?: Array<{ __typename?: 'Publication', id: string, pub_date?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Author', last_name: string }> }> | null, genes?: Array<{ __typename?: 'Gene', name: string }> | null, phenotypes?: Array<{ __typename?: 'Phenotype', phenotype: string, note?: string | null, assay?: string | null, environment?: string | null, publication?: { __typename?: 'Publication', id: string, pub_date?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, authors: Array<{ __typename?: 'Author', last_name: string }> } | null }> | null } | null };

export type ListRecentPlasmidsQueryVariables = Exact<{
  limit?: Scalars['Int']['input'];
}>;


export type ListRecentPlasmidsQuery = { __typename?: 'Query', listRecentPlasmids?: Array<{ __typename?: 'Plasmid', id: string, created_at: any, name: string }> | null };

export type ListRecentStrainsQueryVariables = Exact<{
  limit?: Scalars['Int']['input'];
}>;


export type ListRecentStrainsQuery = { __typename?: 'Query', listRecentStrains?: Array<{ __typename?: 'Strain', id: string, created_at: any, systematic_name: string }> | null };

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
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
export const ListNewsContentDocument = gql`
    query ListNewsContent($limit: Int!) {
  listContent(limit: $limit) {
    id
    slug
    content
    name
    updated_by {
      first_name
      last_name
    }
    updated_at
  }
}
    `;

/**
 * __useListNewsContentQuery__
 *
 * To run a query within a React component, call `useListNewsContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useListNewsContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListNewsContentQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListNewsContentQuery(baseOptions: Apollo.QueryHookOptions<ListNewsContentQuery, ListNewsContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListNewsContentQuery, ListNewsContentQueryVariables>(ListNewsContentDocument, options);
      }
export function useListNewsContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListNewsContentQuery, ListNewsContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListNewsContentQuery, ListNewsContentQueryVariables>(ListNewsContentDocument, options);
        }
export type ListNewsContentQueryHookResult = ReturnType<typeof useListNewsContentQuery>;
export type ListNewsContentLazyQueryHookResult = ReturnType<typeof useListNewsContentLazyQuery>;
export type ListNewsContentQueryResult = Apollo.QueryResult<ListNewsContentQuery, ListNewsContentQueryVariables>;
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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "BasePublication": [
      "Publication",
      "PublicationWithGene"
    ],
    "Stock": [
      "Plasmid",
      "Strain"
    ]
  }
};
      export default result;
    
export type AssociatedSequencesKeySpecifier = ('ests' | 'genbank_genomic_fragment' | 'genbank_mrna' | 'more_link' | AssociatedSequencesKeySpecifier)[];
export type AssociatedSequencesFieldPolicy = {
	ests?: FieldPolicy<any> | FieldReadFunction<any>,
	genbank_genomic_fragment?: FieldPolicy<any> | FieldReadFunction<any>,
	genbank_mrna?: FieldPolicy<any> | FieldReadFunction<any>,
	more_link?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthKeySpecifier = ('identity' | 'token' | 'user' | AuthKeySpecifier)[];
export type AuthFieldPolicy = {
	identity?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthorKeySpecifier = ('first_name' | 'initials' | 'last_name' | 'rank' | AuthorKeySpecifier)[];
export type AuthorFieldPolicy = {
	first_name?: FieldPolicy<any> | FieldReadFunction<any>,
	initials?: FieldPolicy<any> | FieldReadFunction<any>,
	last_name?: FieldPolicy<any> | FieldReadFunction<any>,
	rank?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BasePublicationKeySpecifier = ('abstract' | 'authors' | 'doi' | 'id' | 'issn' | 'issue' | 'journal' | 'pages' | 'pub_date' | 'pub_type' | 'source' | 'status' | 'title' | 'volume' | BasePublicationKeySpecifier)[];
export type BasePublicationFieldPolicy = {
	abstract?: FieldPolicy<any> | FieldReadFunction<any>,
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	doi?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issn?: FieldPolicy<any> | FieldReadFunction<any>,
	issue?: FieldPolicy<any> | FieldReadFunction<any>,
	journal?: FieldPolicy<any> | FieldReadFunction<any>,
	pages?: FieldPolicy<any> | FieldReadFunction<any>,
	pub_date?: FieldPolicy<any> | FieldReadFunction<any>,
	pub_type?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	volume?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CitationKeySpecifier = ('authors' | 'journal' | 'pubmed_id' | 'title' | CitationKeySpecifier)[];
export type CitationFieldPolicy = {
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	journal?: FieldPolicy<any> | FieldReadFunction<any>,
	pubmed_id?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContentKeySpecifier = ('content' | 'created_at' | 'created_by' | 'id' | 'name' | 'namespace' | 'slug' | 'updated_at' | 'updated_by' | ContentKeySpecifier)[];
export type ContentFieldPolicy = {
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	created_by?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	namespace?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_by?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteContentKeySpecifier = ('success' | DeleteContentKeySpecifier)[];
export type DeleteContentFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeletePermissionKeySpecifier = ('success' | DeletePermissionKeySpecifier)[];
export type DeletePermissionFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteRoleKeySpecifier = ('success' | DeleteRoleKeySpecifier)[];
export type DeleteRoleFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteStockKeySpecifier = ('success' | DeleteStockKeySpecifier)[];
export type DeleteStockFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteUserKeySpecifier = ('success' | DeleteUserKeySpecifier)[];
export type DeleteUserFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DownloadKeySpecifier = ('items' | 'title' | DownloadKeySpecifier)[];
export type DownloadFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DownloadItemKeySpecifier = ('title' | 'url' | DownloadItemKeySpecifier)[];
export type DownloadItemFieldPolicy = {
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExtensionKeySpecifier = ('db' | 'id' | 'name' | 'relation' | ExtensionKeySpecifier)[];
export type ExtensionFieldPolicy = {
	db?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	relation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GOAnnotationKeySpecifier = ('assigned_by' | 'date' | 'evidence_code' | 'extensions' | 'go_term' | 'id' | 'publication' | 'qualifier' | 'type' | 'with' | GOAnnotationKeySpecifier)[];
export type GOAnnotationFieldPolicy = {
	assigned_by?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	evidence_code?: FieldPolicy<any> | FieldReadFunction<any>,
	extensions?: FieldPolicy<any> | FieldReadFunction<any>,
	go_term?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	publication?: FieldPolicy<any> | FieldReadFunction<any>,
	qualifier?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	with?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GeneKeySpecifier = ('associated_sequences' | 'general_info' | 'goas' | 'id' | 'links' | 'name' | 'orthologs' | 'product_info' | 'protein_information' | 'strains' | GeneKeySpecifier)[];
export type GeneFieldPolicy = {
	associated_sequences?: FieldPolicy<any> | FieldReadFunction<any>,
	general_info?: FieldPolicy<any> | FieldReadFunction<any>,
	goas?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	orthologs?: FieldPolicy<any> | FieldReadFunction<any>,
	product_info?: FieldPolicy<any> | FieldReadFunction<any>,
	protein_information?: FieldPolicy<any> | FieldReadFunction<any>,
	strains?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GeneralInfoKeySpecifier = ('alt_gene_name' | 'alt_protein_names' | 'description' | 'gene_product' | 'name_description' | GeneralInfoKeySpecifier)[];
export type GeneralInfoFieldPolicy = {
	alt_gene_name?: FieldPolicy<any> | FieldReadFunction<any>,
	alt_protein_names?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	gene_product?: FieldPolicy<any> | FieldReadFunction<any>,
	name_description?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GenomicCoordinatesKeySpecifier = ('chrom_coords' | 'exon' | 'local_coords' | GenomicCoordinatesKeySpecifier)[];
export type GenomicCoordinatesFieldPolicy = {
	chrom_coords?: FieldPolicy<any> | FieldReadFunction<any>,
	exon?: FieldPolicy<any> | FieldReadFunction<any>,
	local_coords?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IdentityKeySpecifier = ('created_at' | 'id' | 'identifier' | 'provider' | 'updated_at' | 'user_id' | IdentityKeySpecifier)[];
export type IdentityFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identifier?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LinksKeySpecifier = ('colleagues' | 'expression' | 'ext_resources' | LinksKeySpecifier)[];
export type LinksFieldPolicy = {
	colleagues?: FieldPolicy<any> | FieldReadFunction<any>,
	expression?: FieldPolicy<any> | FieldReadFunction<any>,
	ext_resources?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LogoutKeySpecifier = ('success' | LogoutKeySpecifier)[];
export type LogoutFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createContent' | 'createOrder' | 'createPermission' | 'createPlasmid' | 'createRole' | 'createRolePermissionRelationship' | 'createStrain' | 'createUser' | 'createUserRoleRelationship' | 'deleteContent' | 'deletePermission' | 'deleteRole' | 'deleteStock' | 'deleteUser' | 'login' | 'logout' | 'updateContent' | 'updateOrder' | 'updatePermission' | 'updatePlasmid' | 'updateRole' | 'updateStrain' | 'updateUser' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createContent?: FieldPolicy<any> | FieldReadFunction<any>,
	createOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	createPermission?: FieldPolicy<any> | FieldReadFunction<any>,
	createPlasmid?: FieldPolicy<any> | FieldReadFunction<any>,
	createRole?: FieldPolicy<any> | FieldReadFunction<any>,
	createRolePermissionRelationship?: FieldPolicy<any> | FieldReadFunction<any>,
	createStrain?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	createUserRoleRelationship?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteContent?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePermission?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteRole?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteStock?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteUser?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	updateContent?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePermission?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePlasmid?: FieldPolicy<any> | FieldReadFunction<any>,
	updateRole?: FieldPolicy<any> | FieldReadFunction<any>,
	updateStrain?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NameWithLinkKeySpecifier = ('link' | 'name' | NameWithLinkKeySpecifier)[];
export type NameWithLinkFieldPolicy = {
	link?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NumberOfPublicationsWithGeneKeySpecifier = ('num_pubs' | 'publications' | NumberOfPublicationsWithGeneKeySpecifier)[];
export type NumberOfPublicationsWithGeneFieldPolicy = {
	num_pubs?: FieldPolicy<any> | FieldReadFunction<any>,
	publications?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderKeySpecifier = ('comments' | 'consumer' | 'courier' | 'courier_account' | 'created_at' | 'id' | 'items' | 'payer' | 'payment' | 'purchase_order_num' | 'purchaser' | 'status' | 'updated_at' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	consumer?: FieldPolicy<any> | FieldReadFunction<any>,
	courier?: FieldPolicy<any> | FieldReadFunction<any>,
	courier_account?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	payer?: FieldPolicy<any> | FieldReadFunction<any>,
	payment?: FieldPolicy<any> | FieldReadFunction<any>,
	purchase_order_num?: FieldPolicy<any> | FieldReadFunction<any>,
	purchaser?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderListWithCursorKeySpecifier = ('limit' | 'nextCursor' | 'orders' | 'previousCursor' | 'totalCount' | OrderListWithCursorKeySpecifier)[];
export type OrderListWithCursorFieldPolicy = {
	limit?: FieldPolicy<any> | FieldReadFunction<any>,
	nextCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	orders?: FieldPolicy<any> | FieldReadFunction<any>,
	previousCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrganismKeySpecifier = ('citations' | 'downloads' | 'scientific_name' | 'taxon_id' | OrganismKeySpecifier)[];
export type OrganismFieldPolicy = {
	citations?: FieldPolicy<any> | FieldReadFunction<any>,
	downloads?: FieldPolicy<any> | FieldReadFunction<any>,
	scientific_name?: FieldPolicy<any> | FieldReadFunction<any>,
	taxon_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrthologsKeySpecifier = ('gene_product' | 'id' | 'source' | 'species' | 'uniprotkb' | OrthologsKeySpecifier)[];
export type OrthologsFieldPolicy = {
	gene_product?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	species?: FieldPolicy<any> | FieldReadFunction<any>,
	uniprotkb?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionKeySpecifier = ('created_at' | 'description' | 'id' | 'permission' | 'resource' | 'updated_at' | PermissionKeySpecifier)[];
export type PermissionFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	permission?: FieldPolicy<any> | FieldReadFunction<any>,
	resource?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PhenotypeKeySpecifier = ('assay' | 'environment' | 'note' | 'phenotype' | 'publication' | PhenotypeKeySpecifier)[];
export type PhenotypeFieldPolicy = {
	assay?: FieldPolicy<any> | FieldReadFunction<any>,
	environment?: FieldPolicy<any> | FieldReadFunction<any>,
	note?: FieldPolicy<any> | FieldReadFunction<any>,
	phenotype?: FieldPolicy<any> | FieldReadFunction<any>,
	publication?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlasmidKeySpecifier = ('created_at' | 'created_by' | 'dbxrefs' | 'depositor' | 'editable_summary' | 'genbank_accession' | 'genes' | 'id' | 'image_map' | 'in_stock' | 'keywords' | 'name' | 'publications' | 'sequence' | 'summary' | 'updated_at' | 'updated_by' | PlasmidKeySpecifier)[];
export type PlasmidFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	created_by?: FieldPolicy<any> | FieldReadFunction<any>,
	dbxrefs?: FieldPolicy<any> | FieldReadFunction<any>,
	depositor?: FieldPolicy<any> | FieldReadFunction<any>,
	editable_summary?: FieldPolicy<any> | FieldReadFunction<any>,
	genbank_accession?: FieldPolicy<any> | FieldReadFunction<any>,
	genes?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image_map?: FieldPolicy<any> | FieldReadFunction<any>,
	in_stock?: FieldPolicy<any> | FieldReadFunction<any>,
	keywords?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	publications?: FieldPolicy<any> | FieldReadFunction<any>,
	sequence?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_by?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlasmidListWithCursorKeySpecifier = ('limit' | 'nextCursor' | 'plasmids' | 'previousCursor' | 'totalCount' | PlasmidListWithCursorKeySpecifier)[];
export type PlasmidListWithCursorFieldPolicy = {
	limit?: FieldPolicy<any> | FieldReadFunction<any>,
	nextCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	plasmids?: FieldPolicy<any> | FieldReadFunction<any>,
	previousCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductInformationKeySpecifier = ('genomic_coords' | 'more_protein_data' | 'protein_coding_gene' | 'protein_length' | 'protein_molecular_weight' | ProductInformationKeySpecifier)[];
export type ProductInformationFieldPolicy = {
	genomic_coords?: FieldPolicy<any> | FieldReadFunction<any>,
	more_protein_data?: FieldPolicy<any> | FieldReadFunction<any>,
	protein_coding_gene?: FieldPolicy<any> | FieldReadFunction<any>,
	protein_length?: FieldPolicy<any> | FieldReadFunction<any>,
	protein_molecular_weight?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProteinGeneralInfoKeySpecifier = ('aa_composition' | 'description' | 'dictybase_id' | 'gene_product' | 'molecular_weight' | 'note' | 'protein_existence' | 'protein_length' | 'subcellular_location' | ProteinGeneralInfoKeySpecifier)[];
export type ProteinGeneralInfoFieldPolicy = {
	aa_composition?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	dictybase_id?: FieldPolicy<any> | FieldReadFunction<any>,
	gene_product?: FieldPolicy<any> | FieldReadFunction<any>,
	molecular_weight?: FieldPolicy<any> | FieldReadFunction<any>,
	note?: FieldPolicy<any> | FieldReadFunction<any>,
	protein_existence?: FieldPolicy<any> | FieldReadFunction<any>,
	protein_length?: FieldPolicy<any> | FieldReadFunction<any>,
	subcellular_location?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProteinInformationKeySpecifier = ('external_links' | 'general_info' | 'protein_sequence' | ProteinInformationKeySpecifier)[];
export type ProteinInformationFieldPolicy = {
	external_links?: FieldPolicy<any> | FieldReadFunction<any>,
	general_info?: FieldPolicy<any> | FieldReadFunction<any>,
	protein_sequence?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PublicationKeySpecifier = ('abstract' | 'authors' | 'doi' | 'id' | 'issn' | 'issue' | 'journal' | 'pages' | 'pub_date' | 'pub_type' | 'source' | 'status' | 'title' | 'volume' | PublicationKeySpecifier)[];
export type PublicationFieldPolicy = {
	abstract?: FieldPolicy<any> | FieldReadFunction<any>,
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	doi?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issn?: FieldPolicy<any> | FieldReadFunction<any>,
	issue?: FieldPolicy<any> | FieldReadFunction<any>,
	journal?: FieldPolicy<any> | FieldReadFunction<any>,
	pages?: FieldPolicy<any> | FieldReadFunction<any>,
	pub_date?: FieldPolicy<any> | FieldReadFunction<any>,
	pub_type?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	volume?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PublicationWithGeneKeySpecifier = ('abstract' | 'authors' | 'doi' | 'id' | 'issn' | 'issue' | 'journal' | 'pages' | 'pub_date' | 'pub_type' | 'related_genes' | 'source' | 'status' | 'title' | 'volume' | PublicationWithGeneKeySpecifier)[];
export type PublicationWithGeneFieldPolicy = {
	abstract?: FieldPolicy<any> | FieldReadFunction<any>,
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	doi?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issn?: FieldPolicy<any> | FieldReadFunction<any>,
	issue?: FieldPolicy<any> | FieldReadFunction<any>,
	journal?: FieldPolicy<any> | FieldReadFunction<any>,
	pages?: FieldPolicy<any> | FieldReadFunction<any>,
	pub_date?: FieldPolicy<any> | FieldReadFunction<any>,
	pub_type?: FieldPolicy<any> | FieldReadFunction<any>,
	related_genes?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	volume?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('allOrthologs' | 'allPublications' | 'allStrains' | 'content' | 'contentBySlug' | 'gene' | 'generalInformation' | 'getAssociatedSequnces' | 'getLinks' | 'getProteinInformation' | 'getRefreshToken' | 'listContent' | 'listGeneProductInfo' | 'listOrders' | 'listOrganisms' | 'listPermissions' | 'listPlasmids' | 'listPlasmidsWithAnnotation' | 'listRecentGenes' | 'listRecentPlasmids' | 'listRecentPublications' | 'listRecentStrains' | 'listRoles' | 'listStrains' | 'listStrainsWithAnnotation' | 'listUsers' | 'order' | 'organism' | 'permission' | 'plasmid' | 'publication' | 'role' | 'strain' | 'user' | 'userByEmail' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	allOrthologs?: FieldPolicy<any> | FieldReadFunction<any>,
	allPublications?: FieldPolicy<any> | FieldReadFunction<any>,
	allStrains?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	contentBySlug?: FieldPolicy<any> | FieldReadFunction<any>,
	gene?: FieldPolicy<any> | FieldReadFunction<any>,
	generalInformation?: FieldPolicy<any> | FieldReadFunction<any>,
	getAssociatedSequnces?: FieldPolicy<any> | FieldReadFunction<any>,
	getLinks?: FieldPolicy<any> | FieldReadFunction<any>,
	getProteinInformation?: FieldPolicy<any> | FieldReadFunction<any>,
	getRefreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	listContent?: FieldPolicy<any> | FieldReadFunction<any>,
	listGeneProductInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	listOrders?: FieldPolicy<any> | FieldReadFunction<any>,
	listOrganisms?: FieldPolicy<any> | FieldReadFunction<any>,
	listPermissions?: FieldPolicy<any> | FieldReadFunction<any>,
	listPlasmids?: FieldPolicy<any> | FieldReadFunction<any>,
	listPlasmidsWithAnnotation?: FieldPolicy<any> | FieldReadFunction<any>,
	listRecentGenes?: FieldPolicy<any> | FieldReadFunction<any>,
	listRecentPlasmids?: FieldPolicy<any> | FieldReadFunction<any>,
	listRecentPublications?: FieldPolicy<any> | FieldReadFunction<any>,
	listRecentStrains?: FieldPolicy<any> | FieldReadFunction<any>,
	listRoles?: FieldPolicy<any> | FieldReadFunction<any>,
	listStrains?: FieldPolicy<any> | FieldReadFunction<any>,
	listStrainsWithAnnotation?: FieldPolicy<any> | FieldReadFunction<any>,
	listUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	organism?: FieldPolicy<any> | FieldReadFunction<any>,
	permission?: FieldPolicy<any> | FieldReadFunction<any>,
	plasmid?: FieldPolicy<any> | FieldReadFunction<any>,
	publication?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	strain?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userByEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoleKeySpecifier = ('created_at' | 'description' | 'id' | 'permissions' | 'role' | 'updated_at' | RoleKeySpecifier)[];
export type RoleFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StockKeySpecifier = ('created_at' | 'created_by' | 'dbxrefs' | 'depositor' | 'editable_summary' | 'genes' | 'id' | 'in_stock' | 'publications' | 'summary' | 'updated_at' | 'updated_by' | StockKeySpecifier)[];
export type StockFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	created_by?: FieldPolicy<any> | FieldReadFunction<any>,
	dbxrefs?: FieldPolicy<any> | FieldReadFunction<any>,
	depositor?: FieldPolicy<any> | FieldReadFunction<any>,
	editable_summary?: FieldPolicy<any> | FieldReadFunction<any>,
	genes?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	in_stock?: FieldPolicy<any> | FieldReadFunction<any>,
	publications?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_by?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrainKeySpecifier = ('characteristics' | 'created_at' | 'created_by' | 'dbxrefs' | 'depositor' | 'editable_summary' | 'genes' | 'genetic_modification' | 'genotypes' | 'id' | 'in_stock' | 'label' | 'mutagenesis_method' | 'names' | 'parent' | 'phenotypes' | 'plasmid' | 'publications' | 'species' | 'summary' | 'systematic_name' | 'updated_at' | 'updated_by' | StrainKeySpecifier)[];
export type StrainFieldPolicy = {
	characteristics?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	created_by?: FieldPolicy<any> | FieldReadFunction<any>,
	dbxrefs?: FieldPolicy<any> | FieldReadFunction<any>,
	depositor?: FieldPolicy<any> | FieldReadFunction<any>,
	editable_summary?: FieldPolicy<any> | FieldReadFunction<any>,
	genes?: FieldPolicy<any> | FieldReadFunction<any>,
	genetic_modification?: FieldPolicy<any> | FieldReadFunction<any>,
	genotypes?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	in_stock?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	mutagenesis_method?: FieldPolicy<any> | FieldReadFunction<any>,
	names?: FieldPolicy<any> | FieldReadFunction<any>,
	parent?: FieldPolicy<any> | FieldReadFunction<any>,
	phenotypes?: FieldPolicy<any> | FieldReadFunction<any>,
	plasmid?: FieldPolicy<any> | FieldReadFunction<any>,
	publications?: FieldPolicy<any> | FieldReadFunction<any>,
	species?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	systematic_name?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_by?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrainListWithCursorKeySpecifier = ('limit' | 'nextCursor' | 'previousCursor' | 'strains' | 'totalCount' | StrainListWithCursorKeySpecifier)[];
export type StrainListWithCursorFieldPolicy = {
	limit?: FieldPolicy<any> | FieldReadFunction<any>,
	nextCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	previousCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	strains?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('city' | 'country' | 'created_at' | 'email' | 'first_address' | 'first_name' | 'group_name' | 'id' | 'is_active' | 'last_name' | 'organization' | 'phone' | 'roles' | 'second_address' | 'state' | 'updated_at' | 'zipcode' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	first_address?: FieldPolicy<any> | FieldReadFunction<any>,
	first_name?: FieldPolicy<any> | FieldReadFunction<any>,
	group_name?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	is_active?: FieldPolicy<any> | FieldReadFunction<any>,
	last_name?: FieldPolicy<any> | FieldReadFunction<any>,
	organization?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	second_address?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	zipcode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserListKeySpecifier = ('pageNum' | 'pageSize' | 'totalCount' | 'users' | UserListKeySpecifier)[];
export type UserListFieldPolicy = {
	pageNum?: FieldPolicy<any> | FieldReadFunction<any>,
	pageSize?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithKeySpecifier = ('db' | 'id' | 'name' | WithKeySpecifier)[];
export type WithFieldPolicy = {
	db?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AssociatedSequences?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AssociatedSequencesKeySpecifier | (() => undefined | AssociatedSequencesKeySpecifier),
		fields?: AssociatedSequencesFieldPolicy,
	},
	Auth?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthKeySpecifier | (() => undefined | AuthKeySpecifier),
		fields?: AuthFieldPolicy,
	},
	Author?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthorKeySpecifier | (() => undefined | AuthorKeySpecifier),
		fields?: AuthorFieldPolicy,
	},
	BasePublication?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BasePublicationKeySpecifier | (() => undefined | BasePublicationKeySpecifier),
		fields?: BasePublicationFieldPolicy,
	},
	Citation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CitationKeySpecifier | (() => undefined | CitationKeySpecifier),
		fields?: CitationFieldPolicy,
	},
	Content?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContentKeySpecifier | (() => undefined | ContentKeySpecifier),
		fields?: ContentFieldPolicy,
	},
	DeleteContent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteContentKeySpecifier | (() => undefined | DeleteContentKeySpecifier),
		fields?: DeleteContentFieldPolicy,
	},
	DeletePermission?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeletePermissionKeySpecifier | (() => undefined | DeletePermissionKeySpecifier),
		fields?: DeletePermissionFieldPolicy,
	},
	DeleteRole?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteRoleKeySpecifier | (() => undefined | DeleteRoleKeySpecifier),
		fields?: DeleteRoleFieldPolicy,
	},
	DeleteStock?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteStockKeySpecifier | (() => undefined | DeleteStockKeySpecifier),
		fields?: DeleteStockFieldPolicy,
	},
	DeleteUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteUserKeySpecifier | (() => undefined | DeleteUserKeySpecifier),
		fields?: DeleteUserFieldPolicy,
	},
	Download?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DownloadKeySpecifier | (() => undefined | DownloadKeySpecifier),
		fields?: DownloadFieldPolicy,
	},
	DownloadItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DownloadItemKeySpecifier | (() => undefined | DownloadItemKeySpecifier),
		fields?: DownloadItemFieldPolicy,
	},
	Extension?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtensionKeySpecifier | (() => undefined | ExtensionKeySpecifier),
		fields?: ExtensionFieldPolicy,
	},
	GOAnnotation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GOAnnotationKeySpecifier | (() => undefined | GOAnnotationKeySpecifier),
		fields?: GOAnnotationFieldPolicy,
	},
	Gene?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GeneKeySpecifier | (() => undefined | GeneKeySpecifier),
		fields?: GeneFieldPolicy,
	},
	GeneralInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GeneralInfoKeySpecifier | (() => undefined | GeneralInfoKeySpecifier),
		fields?: GeneralInfoFieldPolicy,
	},
	GenomicCoordinates?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GenomicCoordinatesKeySpecifier | (() => undefined | GenomicCoordinatesKeySpecifier),
		fields?: GenomicCoordinatesFieldPolicy,
	},
	Identity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IdentityKeySpecifier | (() => undefined | IdentityKeySpecifier),
		fields?: IdentityFieldPolicy,
	},
	Links?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LinksKeySpecifier | (() => undefined | LinksKeySpecifier),
		fields?: LinksFieldPolicy,
	},
	Logout?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LogoutKeySpecifier | (() => undefined | LogoutKeySpecifier),
		fields?: LogoutFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	NameWithLink?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NameWithLinkKeySpecifier | (() => undefined | NameWithLinkKeySpecifier),
		fields?: NameWithLinkFieldPolicy,
	},
	NumberOfPublicationsWithGene?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NumberOfPublicationsWithGeneKeySpecifier | (() => undefined | NumberOfPublicationsWithGeneKeySpecifier),
		fields?: NumberOfPublicationsWithGeneFieldPolicy,
	},
	Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier),
		fields?: OrderFieldPolicy,
	},
	OrderListWithCursor?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderListWithCursorKeySpecifier | (() => undefined | OrderListWithCursorKeySpecifier),
		fields?: OrderListWithCursorFieldPolicy,
	},
	Organism?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrganismKeySpecifier | (() => undefined | OrganismKeySpecifier),
		fields?: OrganismFieldPolicy,
	},
	Orthologs?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrthologsKeySpecifier | (() => undefined | OrthologsKeySpecifier),
		fields?: OrthologsFieldPolicy,
	},
	Permission?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionKeySpecifier | (() => undefined | PermissionKeySpecifier),
		fields?: PermissionFieldPolicy,
	},
	Phenotype?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PhenotypeKeySpecifier | (() => undefined | PhenotypeKeySpecifier),
		fields?: PhenotypeFieldPolicy,
	},
	Plasmid?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlasmidKeySpecifier | (() => undefined | PlasmidKeySpecifier),
		fields?: PlasmidFieldPolicy,
	},
	PlasmidListWithCursor?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlasmidListWithCursorKeySpecifier | (() => undefined | PlasmidListWithCursorKeySpecifier),
		fields?: PlasmidListWithCursorFieldPolicy,
	},
	ProductInformation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductInformationKeySpecifier | (() => undefined | ProductInformationKeySpecifier),
		fields?: ProductInformationFieldPolicy,
	},
	ProteinGeneralInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProteinGeneralInfoKeySpecifier | (() => undefined | ProteinGeneralInfoKeySpecifier),
		fields?: ProteinGeneralInfoFieldPolicy,
	},
	ProteinInformation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProteinInformationKeySpecifier | (() => undefined | ProteinInformationKeySpecifier),
		fields?: ProteinInformationFieldPolicy,
	},
	Publication?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PublicationKeySpecifier | (() => undefined | PublicationKeySpecifier),
		fields?: PublicationFieldPolicy,
	},
	PublicationWithGene?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PublicationWithGeneKeySpecifier | (() => undefined | PublicationWithGeneKeySpecifier),
		fields?: PublicationWithGeneFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Role?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoleKeySpecifier | (() => undefined | RoleKeySpecifier),
		fields?: RoleFieldPolicy,
	},
	Stock?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StockKeySpecifier | (() => undefined | StockKeySpecifier),
		fields?: StockFieldPolicy,
	},
	Strain?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StrainKeySpecifier | (() => undefined | StrainKeySpecifier),
		fields?: StrainFieldPolicy,
	},
	StrainListWithCursor?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StrainListWithCursorKeySpecifier | (() => undefined | StrainListWithCursorKeySpecifier),
		fields?: StrainListWithCursorFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserListKeySpecifier | (() => undefined | UserListKeySpecifier),
		fields?: UserListFieldPolicy,
	},
	With?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithKeySpecifier | (() => undefined | WithKeySpecifier),
		fields?: WithFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLoginMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ login })
 *   )
 * })
 */
export const mockLoginMutation = (resolver: ResponseResolver<GraphQLRequest<LoginMutationVariables>, GraphQLContext<LoginMutation>, any>) =>
  graphql.mutation<LoginMutation, LoginMutationVariables>(
    'Login',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLogoutMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ logout })
 *   )
 * })
 */
export const mockLogoutMutation = (resolver: ResponseResolver<GraphQLRequest<LogoutMutationVariables>, GraphQLContext<LogoutMutation>, any>) =>
  graphql.mutation<LogoutMutation, LogoutMutationVariables>(
    'Logout',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateContentMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createContent })
 *   )
 * })
 */
export const mockCreateContentMutation = (resolver: ResponseResolver<GraphQLRequest<CreateContentMutationVariables>, GraphQLContext<CreateContentMutation>, any>) =>
  graphql.mutation<CreateContentMutation, CreateContentMutationVariables>(
    'CreateContent',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateContentMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ updateContent })
 *   )
 * })
 */
export const mockUpdateContentMutation = (resolver: ResponseResolver<GraphQLRequest<UpdateContentMutationVariables>, GraphQLContext<UpdateContentMutation>, any>) =>
  graphql.mutation<UpdateContentMutation, UpdateContentMutationVariables>(
    'UpdateContent',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateOrderMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createOrder })
 *   )
 * })
 */
export const mockCreateOrderMutation = (resolver: ResponseResolver<GraphQLRequest<CreateOrderMutationVariables>, GraphQLContext<CreateOrderMutation>, any>) =>
  graphql.mutation<CreateOrderMutation, CreateOrderMutationVariables>(
    'CreateOrder',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateUserMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createUser })
 *   )
 * })
 */
export const mockCreateUserMutation = (resolver: ResponseResolver<GraphQLRequest<CreateUserMutationVariables>, GraphQLContext<CreateUserMutation>, any>) =>
  graphql.mutation<CreateUserMutation, CreateUserMutationVariables>(
    'CreateUser',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateUserMutation((req, res, ctx) => {
 *   const { id, input } = req.variables;
 *   return res(
 *     ctx.data({ updateUser })
 *   )
 * })
 */
export const mockUpdateUserMutation = (resolver: ResponseResolver<GraphQLRequest<UpdateUserMutationVariables>, GraphQLContext<UpdateUserMutation>, any>) =>
  graphql.mutation<UpdateUserMutation, UpdateUserMutationVariables>(
    'UpdateUser',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetRefreshTokenQuery((req, res, ctx) => {
 *   const { token } = req.variables;
 *   return res(
 *     ctx.data({ getRefreshToken })
 *   )
 * })
 */
export const mockGetRefreshTokenQuery = (resolver: ResponseResolver<GraphQLRequest<GetRefreshTokenQueryVariables>, GraphQLContext<GetRefreshTokenQuery>, any>) =>
  graphql.query<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>(
    'GetRefreshToken',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockContentBySlugQuery((req, res, ctx) => {
 *   const { slug } = req.variables;
 *   return res(
 *     ctx.data({ contentBySlug })
 *   )
 * })
 */
export const mockContentBySlugQuery = (resolver: ResponseResolver<GraphQLRequest<ContentBySlugQueryVariables>, GraphQLContext<ContentBySlugQuery>, any>) =>
  graphql.query<ContentBySlugQuery, ContentBySlugQueryVariables>(
    'contentBySlug',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockContentQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ content })
 *   )
 * })
 */
export const mockContentQuery = (resolver: ResponseResolver<GraphQLRequest<ContentQueryVariables>, GraphQLContext<ContentQuery>, any>) =>
  graphql.query<ContentQuery, ContentQueryVariables>(
    'content',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListNewsContentQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listContent })
 *   )
 * })
 */
export const mockListNewsContentQuery = (resolver: ResponseResolver<GraphQLRequest<ListNewsContentQueryVariables>, GraphQLContext<ListNewsContentQuery>, any>) =>
  graphql.query<ListNewsContentQuery, ListNewsContentQueryVariables>(
    'ListNewsContent',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListOrganismsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ listOrganisms })
 *   )
 * })
 */
export const mockListOrganismsQuery = (resolver: ResponseResolver<GraphQLRequest<ListOrganismsQueryVariables>, GraphQLContext<ListOrganismsQuery>, any>) =>
  graphql.query<ListOrganismsQuery, ListOrganismsQueryVariables>(
    'ListOrganisms',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGeneQuery((req, res, ctx) => {
 *   const { gene, limit, sort_by } = req.variables;
 *   return res(
 *     ctx.data({ allStrains, gene, allPublications, allOrthologs, listGeneProductInfo, generalInformation, getAssociatedSequnces, getLinks, getProteinInformation })
 *   )
 * })
 */
export const mockGeneQuery = (resolver: ResponseResolver<GraphQLRequest<GeneQueryVariables>, GraphQLContext<GeneQuery>, any>) =>
  graphql.query<GeneQuery, GeneQueryVariables>(
    'Gene',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentGenesQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentGenes })
 *   )
 * })
 */
export const mockListRecentGenesQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentGenesQueryVariables>, GraphQLContext<ListRecentGenesQuery>, any>) =>
  graphql.query<ListRecentGenesQuery, ListRecentGenesQueryVariables>(
    'ListRecentGenes',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPublicationQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ publication })
 *   )
 * })
 */
export const mockPublicationQuery = (resolver: ResponseResolver<GraphQLRequest<PublicationQueryVariables>, GraphQLContext<PublicationQuery>, any>) =>
  graphql.query<PublicationQuery, PublicationQueryVariables>(
    'Publication',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentPublicationsQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentPublications })
 *   )
 * })
 */
export const mockListRecentPublicationsQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentPublicationsQueryVariables>, GraphQLContext<ListRecentPublicationsQuery>, any>) =>
  graphql.query<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>(
    'ListRecentPublications',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStrainListQuery((req, res, ctx) => {
 *   const { cursor, limit, filter } = req.variables;
 *   return res(
 *     ctx.data({ listStrains })
 *   )
 * })
 */
export const mockStrainListQuery = (resolver: ResponseResolver<GraphQLRequest<StrainListQueryVariables>, GraphQLContext<StrainListQuery>, any>) =>
  graphql.query<StrainListQuery, StrainListQueryVariables>(
    'StrainList',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListStrainsWithPhenotypeQuery((req, res, ctx) => {
 *   const { cursor, limit, type, annotation } = req.variables;
 *   return res(
 *     ctx.data({ listStrainsWithAnnotation })
 *   )
 * })
 */
export const mockListStrainsWithPhenotypeQuery = (resolver: ResponseResolver<GraphQLRequest<ListStrainsWithPhenotypeQueryVariables>, GraphQLContext<ListStrainsWithPhenotypeQuery>, any>) =>
  graphql.query<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>(
    'ListStrainsWithPhenotype',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListBacterialStrainsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ listStrainsWithAnnotation, listStrainsWithAnnotation })
 *   )
 * })
 */
export const mockListBacterialStrainsQuery = (resolver: ResponseResolver<GraphQLRequest<ListBacterialStrainsQueryVariables>, GraphQLContext<ListBacterialStrainsQuery>, any>) =>
  graphql.query<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>(
    'ListBacterialStrains',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListStrainsInventoryQuery((req, res, ctx) => {
 *   const { cursor, limit } = req.variables;
 *   return res(
 *     ctx.data({ listStrainsWithAnnotation })
 *   )
 * })
 */
export const mockListStrainsInventoryQuery = (resolver: ResponseResolver<GraphQLRequest<ListStrainsInventoryQueryVariables>, GraphQLContext<ListStrainsInventoryQuery>, any>) =>
  graphql.query<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>(
    'ListStrainsInventory',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListPlasmidsInventoryQuery((req, res, ctx) => {
 *   const { cursor, limit } = req.variables;
 *   return res(
 *     ctx.data({ listPlasmidsWithAnnotation })
 *   )
 * })
 */
export const mockListPlasmidsInventoryQuery = (resolver: ResponseResolver<GraphQLRequest<ListPlasmidsInventoryQueryVariables>, GraphQLContext<ListPlasmidsInventoryQuery>, any>) =>
  graphql.query<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>(
    'ListPlasmidsInventory',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPlasmidListFilterQuery((req, res, ctx) => {
 *   const { cursor, limit, filter } = req.variables;
 *   return res(
 *     ctx.data({ listPlasmids })
 *   )
 * })
 */
export const mockPlasmidListFilterQuery = (resolver: ResponseResolver<GraphQLRequest<PlasmidListFilterQueryVariables>, GraphQLContext<PlasmidListFilterQuery>, any>) =>
  graphql.query<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>(
    'PlasmidListFilter',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPlasmidQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ plasmid })
 *   )
 * })
 */
export const mockPlasmidQuery = (resolver: ResponseResolver<GraphQLRequest<PlasmidQueryVariables>, GraphQLContext<PlasmidQuery>, any>) =>
  graphql.query<PlasmidQuery, PlasmidQueryVariables>(
    'Plasmid',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStrainQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ strain })
 *   )
 * })
 */
export const mockStrainQuery = (resolver: ResponseResolver<GraphQLRequest<StrainQueryVariables>, GraphQLContext<StrainQuery>, any>) =>
  graphql.query<StrainQuery, StrainQueryVariables>(
    'Strain',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentPlasmidsQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentPlasmids })
 *   )
 * })
 */
export const mockListRecentPlasmidsQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentPlasmidsQueryVariables>, GraphQLContext<ListRecentPlasmidsQuery>, any>) =>
  graphql.query<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>(
    'ListRecentPlasmids',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentStrainsQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentStrains })
 *   )
 * })
 */
export const mockListRecentStrainsQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentStrainsQueryVariables>, GraphQLContext<ListRecentStrainsQuery>, any>) =>
  graphql.query<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>(
    'ListRecentStrains',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserByEmailQuery((req, res, ctx) => {
 *   const { email } = req.variables;
 *   return res(
 *     ctx.data({ userByEmail })
 *   )
 * })
 */
export const mockUserByEmailQuery = (resolver: ResponseResolver<GraphQLRequest<UserByEmailQueryVariables>, GraphQLContext<UserByEmailQuery>, any>) =>
  graphql.query<UserByEmailQuery, UserByEmailQueryVariables>(
    'UserByEmail',
    resolver
  )
