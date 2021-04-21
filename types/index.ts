export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String'];
  user: User;
  identity: Identity;
};

export type Author = {
  __typename?: 'Author';
  last_name?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  initials?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['String']>;
};

export type Citation = {
  __typename?: 'Citation';
  authors: Scalars['String'];
  title: Scalars['String'];
  journal: Scalars['String'];
  pubmed_id: Scalars['String'];
};

export type Content = {
  __typename?: 'Content';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  created_by: User;
  updated_by: User;
  created_at: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
  content: Scalars['String'];
  namespace: Scalars['String'];
};

export type CreateContentInput = {
  name: Scalars['String'];
  created_by: Scalars['String'];
  content: Scalars['String'];
  namespace: Scalars['String'];
};

export type CreateOrderInput = {
  courier: Scalars['String'];
  courier_account: Scalars['String'];
  comments?: Maybe<Scalars['String']>;
  payment: Scalars['String'];
  purchase_order_num?: Maybe<Scalars['String']>;
  status: StatusEnum;
  consumer: Scalars['String'];
  payer: Scalars['String'];
  purchaser: Scalars['String'];
  items: Array<Maybe<Scalars['String']>>;
};

export type CreatePermissionInput = {
  permission: Scalars['String'];
  description: Scalars['String'];
  resource: Scalars['String'];
};

export type CreatePlasmidInput = {
  created_by: Scalars['String'];
  updated_by: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  editable_summary?: Maybe<Scalars['String']>;
  depositor?: Maybe<Scalars['String']>;
  genes?: Maybe<Array<Maybe<Scalars['String']>>>;
  dbxrefs?: Maybe<Array<Maybe<Scalars['String']>>>;
  publications?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
  image_map?: Maybe<Scalars['String']>;
  sequence?: Maybe<Scalars['String']>;
  in_stock: Scalars['Boolean'];
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  genbank_accession?: Maybe<Scalars['String']>;
};

export type CreateRoleInput = {
  role: Scalars['String'];
  description: Scalars['String'];
};

export type CreateStrainInput = {
  created_by: Scalars['String'];
  updated_by: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  editable_summary?: Maybe<Scalars['String']>;
  depositor?: Maybe<Scalars['String']>;
  genes?: Maybe<Array<Maybe<Scalars['String']>>>;
  dbxrefs?: Maybe<Array<Maybe<Scalars['String']>>>;
  publications?: Maybe<Array<Maybe<Scalars['String']>>>;
  systematic_name: Scalars['String'];
  label: Scalars['String'];
  species: Scalars['String'];
  plasmid?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  in_stock: Scalars['Boolean'];
  phenotypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  genetic_modification?: Maybe<Scalars['String']>;
  mutagenesis_method?: Maybe<Scalars['String']>;
  characteristics?: Maybe<Array<Maybe<Scalars['String']>>>;
  genotypes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateUserInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  organization?: Maybe<Scalars['String']>;
  group_name?: Maybe<Scalars['String']>;
  first_address?: Maybe<Scalars['String']>;
  second_address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  is_active: Scalars['Boolean'];
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
  title: Scalars['String'];
  items: Array<DownloadItem>;
};

export type DownloadItem = {
  __typename?: 'DownloadItem';
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Extension = {
  __typename?: 'Extension';
  id: Scalars['String'];
  db: Scalars['String'];
  relation: Scalars['String'];
  name: Scalars['String'];
};

export type GoAnnotation = {
  __typename?: 'GOAnnotation';
  id: Scalars['String'];
  type: Scalars['String'];
  date: Scalars['String'];
  evidence_code: Scalars['String'];
  go_term: Scalars['String'];
  qualifier: Scalars['String'];
  publication: Scalars['String'];
  with?: Maybe<Array<With>>;
  extensions?: Maybe<Array<Extension>>;
  assigned_by: Scalars['String'];
};

export type Gene = {
  __typename?: 'Gene';
  id: Scalars['String'];
  name: Scalars['String'];
  goas?: Maybe<Array<Maybe<GoAnnotation>>>;
};

export type Identity = {
  __typename?: 'Identity';
  id: Scalars['ID'];
  identifier: Scalars['String'];
  provider: Scalars['String'];
  user_id: Scalars['ID'];
  created_at: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
};

export type LoginInput = {
  client_id: Scalars['String'];
  state: Scalars['String'];
  code: Scalars['String'];
  scopes: Scalars['String'];
  provider: Scalars['String'];
  redirect_url: Scalars['String'];
};

export type Logout = {
  __typename?: 'Logout';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Auth>;
  logout?: Maybe<Logout>;
  createContent?: Maybe<Content>;
  updateContent?: Maybe<Content>;
  deleteContent?: Maybe<DeleteContent>;
  createOrder?: Maybe<Order>;
  updateOrder?: Maybe<Order>;
  createStrain?: Maybe<Strain>;
  createPlasmid?: Maybe<Plasmid>;
  updateStrain?: Maybe<Strain>;
  updatePlasmid?: Maybe<Plasmid>;
  deleteStock?: Maybe<DeleteStock>;
  createUser?: Maybe<User>;
  createUserRoleRelationship?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<DeleteUser>;
  createRole?: Maybe<Role>;
  createRolePermissionRelationship?: Maybe<Role>;
  updateRole?: Maybe<Role>;
  deleteRole?: Maybe<DeleteRole>;
  createPermission?: Maybe<Permission>;
  updatePermission?: Maybe<Permission>;
  deletePermission?: Maybe<DeletePermission>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationCreateContentArgs = {
  input?: Maybe<CreateContentInput>;
};


export type MutationUpdateContentArgs = {
  input?: Maybe<UpdateContentInput>;
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID'];
};


export type MutationCreateOrderArgs = {
  input?: Maybe<CreateOrderInput>;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdateOrderInput>;
};


export type MutationCreateStrainArgs = {
  input?: Maybe<CreateStrainInput>;
};


export type MutationCreatePlasmidArgs = {
  input?: Maybe<CreatePlasmidInput>;
};


export type MutationUpdateStrainArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdateStrainInput>;
};


export type MutationUpdatePlasmidArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdatePlasmidInput>;
};


export type MutationDeleteStockArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationCreateUserRoleRelationshipArgs = {
  userId: Scalars['ID'];
  roleId: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdateUserInput>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationCreateRolePermissionRelationshipArgs = {
  roleId: Scalars['ID'];
  permissionId: Scalars['ID'];
};


export type MutationUpdateRoleArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdateRoleInput>;
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePermissionArgs = {
  input?: Maybe<CreatePermissionInput>;
};


export type MutationUpdatePermissionArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdatePermissionInput>;
};


export type MutationDeletePermissionArgs = {
  id: Scalars['ID'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  created_at: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
  courier?: Maybe<Scalars['String']>;
  courier_account?: Maybe<Scalars['String']>;
  comments?: Maybe<Scalars['String']>;
  payment?: Maybe<Scalars['String']>;
  purchase_order_num?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  consumer?: Maybe<User>;
  payer?: Maybe<User>;
  purchaser?: Maybe<User>;
  items?: Maybe<Array<Maybe<Stock>>>;
};

export type OrderListWithCursor = {
  __typename?: 'OrderListWithCursor';
  orders: Array<Order>;
  nextCursor: Scalars['Int'];
  previousCursor: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Organism = {
  __typename?: 'Organism';
  taxon_id: Scalars['String'];
  scientific_name: Scalars['String'];
  citations: Array<Citation>;
  downloads: Array<Download>;
};

export type Permission = {
  __typename?: 'Permission';
  id: Scalars['ID'];
  permission: Scalars['String'];
  description: Scalars['String'];
  created_at: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
  resource?: Maybe<Scalars['String']>;
};

export type Phenotype = {
  __typename?: 'Phenotype';
  phenotype: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  assay?: Maybe<Scalars['String']>;
  environment?: Maybe<Scalars['String']>;
  publication?: Maybe<Publication>;
};

export type Plasmid = Stock & {
  __typename?: 'Plasmid';
  id: Scalars['ID'];
  created_at: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
  created_by: User;
  updated_by: User;
  summary?: Maybe<Scalars['String']>;
  editable_summary?: Maybe<Scalars['String']>;
  depositor: User;
  genes?: Maybe<Array<Maybe<Gene>>>;
  dbxrefs?: Maybe<Array<Maybe<Scalars['String']>>>;
  publications?: Maybe<Array<Maybe<Publication>>>;
  name: Scalars['String'];
  image_map?: Maybe<Scalars['String']>;
  sequence?: Maybe<Scalars['String']>;
  in_stock: Scalars['Boolean'];
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  genbank_accession?: Maybe<Scalars['String']>;
};

export type PlasmidListWithCursor = {
  __typename?: 'PlasmidListWithCursor';
  plasmids: Array<Plasmid>;
  nextCursor: Scalars['Int'];
  previousCursor: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Publication = {
  __typename?: 'Publication';
  id: Scalars['ID'];
  doi?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  abstract?: Maybe<Scalars['String']>;
  journal?: Maybe<Scalars['String']>;
  pub_date?: Maybe<Scalars['Timestamp']>;
  volume?: Maybe<Scalars['String']>;
  pages?: Maybe<Scalars['String']>;
  issn?: Maybe<Scalars['String']>;
  pub_type?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  issue?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  authors?: Maybe<Array<Maybe<Author>>>;
};

export type Query = {
  __typename?: 'Query';
  getRefreshToken?: Maybe<Auth>;
  content?: Maybe<Content>;
  contentBySlug?: Maybe<Content>;
  organism?: Maybe<Organism>;
  listOrganisms?: Maybe<Array<Organism>>;
  gene?: Maybe<Gene>;
  order?: Maybe<Order>;
  listOrders?: Maybe<OrderListWithCursor>;
  publication?: Maybe<Publication>;
  plasmid?: Maybe<Plasmid>;
  strain?: Maybe<Strain>;
  listStrains?: Maybe<StrainListWithCursor>;
  listPlasmids?: Maybe<PlasmidListWithCursor>;
  listStrainsWithAnnotation?: Maybe<StrainListWithCursor>;
  listPlasmidsWithAnnotation?: Maybe<PlasmidListWithCursor>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  listUsers?: Maybe<UserList>;
  role?: Maybe<Role>;
  listRoles?: Maybe<Array<Role>>;
  permission?: Maybe<Permission>;
  listPermissions?: Maybe<Array<Permission>>;
};


export type QueryGetRefreshTokenArgs = {
  token: Scalars['String'];
};


export type QueryContentArgs = {
  id: Scalars['ID'];
};


export type QueryContentBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryOrganismArgs = {
  taxon_id: Scalars['String'];
};


export type QueryGeneArgs = {
  gene: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryListOrdersArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryPublicationArgs = {
  id: Scalars['ID'];
};


export type QueryPlasmidArgs = {
  id: Scalars['ID'];
};


export type QueryStrainArgs = {
  id: Scalars['ID'];
};


export type QueryListStrainsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  filter?: Maybe<StrainListFilter>;
};


export type QueryListPlasmidsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryListStrainsWithAnnotationArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  annotation: Scalars['String'];
};


export type QueryListPlasmidsWithAnnotationArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  annotation: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryListUsersArgs = {
  pagenum: Scalars['String'];
  pagesize: Scalars['String'];
  filter: Scalars['String'];
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryPermissionArgs = {
  id: Scalars['ID'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  role: Scalars['String'];
  description: Scalars['String'];
  created_at: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
  permissions?: Maybe<Array<Permission>>;
};

export enum StatusEnum {
  InPreparation = 'IN_PREPARATION',
  Growing = 'GROWING',
  Cancelled = 'CANCELLED',
  Shipped = 'SHIPPED'
}

export type Stock = {
  id: Scalars['ID'];
  created_at: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
  created_by: User;
  updated_by: User;
  summary?: Maybe<Scalars['String']>;
  editable_summary?: Maybe<Scalars['String']>;
  depositor: User;
  genes?: Maybe<Array<Maybe<Gene>>>;
  dbxrefs?: Maybe<Array<Maybe<Scalars['String']>>>;
  publications?: Maybe<Array<Maybe<Publication>>>;
  in_stock: Scalars['Boolean'];
};

export type Strain = Stock & {
  __typename?: 'Strain';
  id: Scalars['ID'];
  created_at: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
  created_by: User;
  updated_by: User;
  summary?: Maybe<Scalars['String']>;
  editable_summary?: Maybe<Scalars['String']>;
  depositor: User;
  genes?: Maybe<Array<Maybe<Gene>>>;
  dbxrefs?: Maybe<Array<Maybe<Scalars['String']>>>;
  publications?: Maybe<Array<Maybe<Publication>>>;
  systematic_name: Scalars['String'];
  label: Scalars['String'];
  species: Scalars['String'];
  plasmid?: Maybe<Scalars['String']>;
  parent?: Maybe<Strain>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  in_stock: Scalars['Boolean'];
  phenotypes?: Maybe<Array<Maybe<Phenotype>>>;
  genetic_modification?: Maybe<Scalars['String']>;
  mutagenesis_method?: Maybe<Scalars['String']>;
  characteristics?: Maybe<Array<Maybe<Scalars['String']>>>;
  genotypes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StrainListFilter = {
  label?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  in_stock?: Maybe<Scalars['Boolean']>;
  strain_type: StrainTypeEnum;
};

export type StrainListWithCursor = {
  __typename?: 'StrainListWithCursor';
  strains: Array<Strain>;
  nextCursor: Scalars['Int'];
  previousCursor: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export enum StrainTypeEnum {
  All = 'ALL',
  Regular = 'REGULAR',
  Gwdi = 'GWDI',
  Bacterial = 'BACTERIAL'
}


export type UpdateContentInput = {
  id: Scalars['ID'];
  updated_by: Scalars['String'];
  content: Scalars['String'];
};

export type UpdateOrderInput = {
  courier?: Maybe<Scalars['String']>;
  courier_account?: Maybe<Scalars['String']>;
  comments?: Maybe<Scalars['String']>;
  payment?: Maybe<Scalars['String']>;
  purchase_order_num?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  items?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdatePermissionInput = {
  permission: Scalars['String'];
  description: Scalars['String'];
  resource: Scalars['String'];
};

export type UpdatePlasmidInput = {
  updated_by: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  editable_summary?: Maybe<Scalars['String']>;
  depositor?: Maybe<Scalars['String']>;
  genes?: Maybe<Array<Maybe<Scalars['String']>>>;
  dbxrefs?: Maybe<Array<Maybe<Scalars['String']>>>;
  publications?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  image_map?: Maybe<Scalars['String']>;
  sequence?: Maybe<Scalars['String']>;
  in_stock?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  genbank_accession?: Maybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  role: Scalars['String'];
  description: Scalars['String'];
};

export type UpdateStrainInput = {
  updated_by: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  editable_summary?: Maybe<Scalars['String']>;
  depositor?: Maybe<Scalars['String']>;
  genes?: Maybe<Array<Maybe<Scalars['String']>>>;
  dbxrefs?: Maybe<Array<Maybe<Scalars['String']>>>;
  publications?: Maybe<Array<Maybe<Scalars['String']>>>;
  systematic_name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  species?: Maybe<Scalars['String']>;
  plasmid?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  in_stock?: Maybe<Scalars['Boolean']>;
  phenotypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  genetic_modification?: Maybe<Scalars['String']>;
  mutagenesis_method?: Maybe<Scalars['String']>;
  characteristics?: Maybe<Array<Maybe<Scalars['String']>>>;
  genotypes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateUserInput = {
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['String']>;
  group_name?: Maybe<Scalars['String']>;
  first_address?: Maybe<Scalars['String']>;
  second_address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  is_active?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  organization?: Maybe<Scalars['String']>;
  group_name?: Maybe<Scalars['String']>;
  first_address?: Maybe<Scalars['String']>;
  second_address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  is_active: Scalars['Boolean'];
  created_at: Scalars['Timestamp'];
  updated_at: Scalars['Timestamp'];
  roles?: Maybe<Array<Role>>;
};

export type UserList = {
  __typename?: 'UserList';
  users: Array<User>;
  pageNum?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['String']>;
  totalCount: Scalars['Int'];
};

export type With = {
  __typename?: 'With';
  id: Scalars['String'];
  db: Scalars['String'];
  name: Scalars['String'];
};
