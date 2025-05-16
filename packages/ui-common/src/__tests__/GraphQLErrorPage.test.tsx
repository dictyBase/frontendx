/* eslint-disable unicorn/filename-case */
import { test, describe, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  mockNotFoundError,
  mockOtherError,
  mockUnavailableError,
} from "../mocks/mockGraphQLError"
import { GraphQLErrorPage } from "../Error/GraphQLErrorPage"
import { ApolloError } from "@apollo/client"

describe("GraphQLErrorPage", () => {
  test("should render the component with Not Found error message", () => {
    // Create an ApolloError with the mock not found error
    const apolloError = new ApolloError({
      graphQLErrors: mockNotFoundError.errors,
    })
    
    render(<GraphQLErrorPage error={apolloError} />)
    
    // Check that the error message is displayed correctly
    expect(screen.getByText("Error Details")).toBeInTheDocument()
    expect(screen.getByText("The requested resource was not found")).toBeInTheDocument()
  })
  
  test("should render the component with Unavailable error message", () => {
    // Create an ApolloError with the mock unavailable error
    const apolloError = new ApolloError({
      graphQLErrors: mockUnavailableError.errors,
    })
    
    render(<GraphQLErrorPage error={apolloError} />)
    
    // Check that the error message is displayed correctly
    expect(screen.getByText("Error Details")).toBeInTheDocument()
    expect(screen.getByText("The requested resource is unavailable")).toBeInTheDocument()
  })
  
  test("should render the component with default error message for unknown error", () => {
    // Create an ApolloError with the mock other error
    const apolloError = new ApolloError({
      graphQLErrors: mockOtherError.errors,
    })
    
    render(<GraphQLErrorPage error={apolloError} />)
    
    // Check that the default error message is displayed correctly
    expect(screen.getByText("Error Details")).toBeInTheDocument()
    expect(screen.getByText("An unexpected error occurred.")).toBeInTheDocument()
  })
  
  test("should render the component with network error message", () => {
    // Create an ApolloError with a network error
    const apolloError = new ApolloError({
      networkError: new Error("Network error"),
    })
    
    render(<GraphQLErrorPage error={apolloError} />)
    
    // Check that the network error message is displayed correctly
    expect(screen.getByText("Error Details")).toBeInTheDocument()
    expect(screen.getByText("The server encountered an unexpected error")).toBeInTheDocument()
  })
  
  test("should correctly render ErrorDisplay with proper title and message", () => {
    // Create an ApolloError with the mock not found error
    const apolloError = new ApolloError({
      graphQLErrors: mockNotFoundError.errors,
    })
    
    render(<GraphQLErrorPage error={apolloError} />)
    
    // Verify standard UI elements from ErrorDisplay are present
    expect(screen.getByText("Sorry, something went wrong.")).toBeInTheDocument()
    expect(screen.getByText("We encountered an error while processing your request.")).toBeInTheDocument()
    expect(screen.getByText("Error Details")).toBeInTheDocument()
    expect(screen.getByText("The requested resource was not found")).toBeInTheDocument()
    expect(screen.getByText("What you can try:")).toBeInTheDocument()
    expect(screen.getByText("Refresh the page")).toBeInTheDocument()
    expect(screen.getByText("Need assistance?")).toBeInTheDocument()
    expect(screen.getByText("dictybase@northwestern.edu")).toBeInTheDocument()
    expect(screen.getByText("Refresh Page")).toBeInTheDocument()
    expect(screen.getByText("Return to Homepage")).toBeInTheDocument()
  })
})

