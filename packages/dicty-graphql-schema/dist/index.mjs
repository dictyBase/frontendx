// types/index.ts
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
var defaultOptions = {};
var StatusEnum = /* @__PURE__ */ ((StatusEnum2) => {
  StatusEnum2["Cancelled"] = "CANCELLED";
  StatusEnum2["Growing"] = "GROWING";
  StatusEnum2["InPreparation"] = "IN_PREPARATION";
  StatusEnum2["Shipped"] = "SHIPPED";
  return StatusEnum2;
})(StatusEnum || {});
var StrainType = /* @__PURE__ */ ((StrainType2) => {
  StrainType2["All"] = "ALL";
  StrainType2["Bacterial"] = "BACTERIAL";
  StrainType2["Gwdi"] = "GWDI";
  StrainType2["Regular"] = "REGULAR";
  return StrainType2;
})(StrainType || {});
var LoginDocument = gql`
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
function useLoginMutation(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation(LoginDocument, options);
}
var LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
function useLogoutMutation(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation(LogoutDocument, options);
}
var CreateContentDocument = gql`
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
function useCreateContentMutation(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation(CreateContentDocument, options);
}
var UpdateContentDocument = gql`
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
function useUpdateContentMutation(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation(UpdateContentDocument, options);
}
var CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
  }
}
    `;
function useCreateOrderMutation(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation(CreateOrderDocument, options);
}
var CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}
    `;
function useCreateUserMutation(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation(CreateUserDocument, options);
}
var UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
  }
}
    `;
function useUpdateUserMutation(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation(UpdateUserDocument, options);
}
var GetRefreshTokenDocument = gql`
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
function useGetRefreshTokenQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(GetRefreshTokenDocument, options);
}
function useGetRefreshTokenLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(GetRefreshTokenDocument, options);
}
var ContentBySlugDocument = gql`
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
function useContentBySlugQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ContentBySlugDocument, options);
}
function useContentBySlugLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ContentBySlugDocument, options);
}
var ContentDocument = gql`
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
function useContentQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ContentDocument, options);
}
function useContentLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ContentDocument, options);
}
var ListOrganismsDocument = gql`
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
function useListOrganismsQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ListOrganismsDocument, options);
}
function useListOrganismsLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ListOrganismsDocument, options);
}
var GeneDocument = gql`
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
function useGeneQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(GeneDocument, options);
}
function useGeneLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(GeneDocument, options);
}
var ListRecentGenesDocument = gql`
    query ListRecentGenes($limit: Int! = 4) {
  listRecentGenes(limit: $limit) {
    id
    name
  }
}
    `;
function useListRecentGenesQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ListRecentGenesDocument, options);
}
function useListRecentGenesLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ListRecentGenesDocument, options);
}
var PublicationDocument = gql`
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
function usePublicationQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(PublicationDocument, options);
}
function usePublicationLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(PublicationDocument, options);
}
var ListRecentPublicationsDocument = gql`
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
function useListRecentPublicationsQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ListRecentPublicationsDocument, options);
}
function useListRecentPublicationsLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ListRecentPublicationsDocument, options);
}
var StrainListDocument = gql`
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
function useStrainListQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(StrainListDocument, options);
}
function useStrainListLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(StrainListDocument, options);
}
var ListStrainsWithPhenotypeDocument = gql`
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
function useListStrainsWithPhenotypeQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ListStrainsWithPhenotypeDocument, options);
}
function useListStrainsWithPhenotypeLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ListStrainsWithPhenotypeDocument, options);
}
var ListBacterialStrainsDocument = gql`
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
function useListBacterialStrainsQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ListBacterialStrainsDocument, options);
}
function useListBacterialStrainsLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ListBacterialStrainsDocument, options);
}
var ListStrainsInventoryDocument = gql`
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
function useListStrainsInventoryQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ListStrainsInventoryDocument, options);
}
function useListStrainsInventoryLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ListStrainsInventoryDocument, options);
}
var ListPlasmidsInventoryDocument = gql`
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
function useListPlasmidsInventoryQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ListPlasmidsInventoryDocument, options);
}
function useListPlasmidsInventoryLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ListPlasmidsInventoryDocument, options);
}
var PlasmidListFilterDocument = gql`
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
function usePlasmidListFilterQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(PlasmidListFilterDocument, options);
}
function usePlasmidListFilterLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(PlasmidListFilterDocument, options);
}
var PlasmidDocument = gql`
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
function usePlasmidQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(PlasmidDocument, options);
}
function usePlasmidLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(PlasmidDocument, options);
}
var StrainDocument = gql`
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
function useStrainQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(StrainDocument, options);
}
function useStrainLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(StrainDocument, options);
}
var ListRecentPlasmidsDocument = gql`
    query ListRecentPlasmids($limit: Int! = 4) {
  listRecentPlasmids(limit: $limit) {
    id
    created_at
    name
  }
}
    `;
function useListRecentPlasmidsQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ListRecentPlasmidsDocument, options);
}
function useListRecentPlasmidsLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ListRecentPlasmidsDocument, options);
}
var ListRecentStrainsDocument = gql`
    query ListRecentStrains($limit: Int! = 4) {
  listRecentStrains(limit: $limit) {
    id
    created_at
    systematic_name
  }
}
    `;
function useListRecentStrainsQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(ListRecentStrainsDocument, options);
}
function useListRecentStrainsLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(ListRecentStrainsDocument, options);
}
var UserByEmailDocument = gql`
    query UserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
  }
}
    `;
function useUserByEmailQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery(UserByEmailDocument, options);
}
function useUserByEmailLazyQuery(baseOptions) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery(UserByEmailDocument, options);
}
export {
  ContentBySlugDocument,
  ContentDocument,
  CreateContentDocument,
  CreateOrderDocument,
  CreateUserDocument,
  GeneDocument,
  GetRefreshTokenDocument,
  ListBacterialStrainsDocument,
  ListOrganismsDocument,
  ListPlasmidsInventoryDocument,
  ListRecentGenesDocument,
  ListRecentPlasmidsDocument,
  ListRecentPublicationsDocument,
  ListRecentStrainsDocument,
  ListStrainsInventoryDocument,
  ListStrainsWithPhenotypeDocument,
  LoginDocument,
  LogoutDocument,
  PlasmidDocument,
  PlasmidListFilterDocument,
  PublicationDocument,
  StatusEnum,
  StrainDocument,
  StrainListDocument,
  StrainType,
  UpdateContentDocument,
  UpdateUserDocument,
  UserByEmailDocument,
  useContentBySlugLazyQuery,
  useContentBySlugQuery,
  useContentLazyQuery,
  useContentQuery,
  useCreateContentMutation,
  useCreateOrderMutation,
  useCreateUserMutation,
  useGeneLazyQuery,
  useGeneQuery,
  useGetRefreshTokenLazyQuery,
  useGetRefreshTokenQuery,
  useListBacterialStrainsLazyQuery,
  useListBacterialStrainsQuery,
  useListOrganismsLazyQuery,
  useListOrganismsQuery,
  useListPlasmidsInventoryLazyQuery,
  useListPlasmidsInventoryQuery,
  useListRecentGenesLazyQuery,
  useListRecentGenesQuery,
  useListRecentPlasmidsLazyQuery,
  useListRecentPlasmidsQuery,
  useListRecentPublicationsLazyQuery,
  useListRecentPublicationsQuery,
  useListRecentStrainsLazyQuery,
  useListRecentStrainsQuery,
  useListStrainsInventoryLazyQuery,
  useListStrainsInventoryQuery,
  useListStrainsWithPhenotypeLazyQuery,
  useListStrainsWithPhenotypeQuery,
  useLoginMutation,
  useLogoutMutation,
  usePlasmidLazyQuery,
  usePlasmidListFilterLazyQuery,
  usePlasmidListFilterQuery,
  usePlasmidQuery,
  usePublicationLazyQuery,
  usePublicationQuery,
  useStrainLazyQuery,
  useStrainListLazyQuery,
  useStrainListQuery,
  useStrainQuery,
  useUpdateContentMutation,
  useUpdateUserMutation,
  useUserByEmailLazyQuery,
  useUserByEmailQuery
};
