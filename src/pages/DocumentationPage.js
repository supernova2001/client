import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaUserShield, FaUpload, FaEdit, FaTrash, FaCode, FaDatabase, FaLock, FaUnlock } from 'react-icons/fa';

const DocumentationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #0071dc;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #6c757d;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 2px solid #0071dc;
  padding-bottom: 0.5rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #0071dc;
`;

const FeatureTitle = styled.h3`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #6c757d;
  line-height: 1.6;
`;

const EndpointSection = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #28a745;
`;

const EndpointTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MethodBadge = styled.span`
  background: ${props => {
    switch(props.method) {
      case 'GET': return '#28a745';
      case 'POST': return '#007bff';
      case 'PUT': return '#ffc107';
      case 'DELETE': return '#dc3545';
      default: return '#6c757d';
    }
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const EndpointPath = styled.code`
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
`;

const EndpointDescription = styled.p`
  color: #6c757d;
  margin: 0.5rem 0;
`;

const ParametersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: white;
  border-radius: 4px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  background: #0071dc;
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e9ecef;
`;

const CodeBlock = styled.pre`
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
`;

const ResponseExample = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  border-left: 4px solid #28a745;
`;

const ResponseTitle = styled.h4`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const TechItem = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border: 2px solid #e9ecef;
`;

const TechName = styled.h4`
  color: #333;
  margin-bottom: 0.5rem;
`;

const TechDescription = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
`;

const DocumentationPage = () => {
  return (
    <DocumentationContainer>
      <Title>Walmart Assessment - Search UI Application</Title>
      <Subtitle>Comprehensive Documentation & API Reference</Subtitle>

      {/* Features Overview */}
      <Section>
        <SectionTitle>
          <FaCode /> Application Features
        </SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureTitle>
              <FaSearch /> Advanced Search with Fuzzy Matching
            </FeatureTitle>
            <FeatureDescription>
              Intelligent search powered by Fuse.js that handles typos, partial matches, and semantic search across item names, descriptions, categories, and prices.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureTitle>
              <FaFilter /> Smart Filtering System
            </FeatureTitle>
            <FeatureDescription>
              Filter items by category (Electronics, Clothing, Home), price ranges, stock availability, and sort by relevance, price, name, or date.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureTitle>
              <FaUserShield /> Admin Authentication
            </FeatureTitle>
            <FeatureDescription>
              Secure admin login system protecting item management features. Admins can view, edit, delete, and upload items with full CRUD operations.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureTitle>
              <FaUpload /> Bulk & Manual Upload
            </FeatureTitle>
            <FeatureDescription>
              Upload items via JSON file for bulk operations or use the manual form for individual item creation with image upload support.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureTitle>
              <FaEdit /> Item Management
            </FeatureTitle>
            <FeatureDescription>
              Complete CRUD operations for items including real-time editing, deletion, and data management with validation and error handling.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureTitle>
              <FaDatabase /> Data Management
            </FeatureTitle>
            <FeatureDescription>
              Seed database with sample data, clear all items, and manage data integrity with comprehensive validation and error handling.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      {/* Technical Implementation */}
      <Section>
        <SectionTitle>
          <FaCode /> Technical Implementation
        </SectionTitle>
        
        <TechStack>
          <TechItem>
            <TechName>Frontend</TechName>
            <TechDescription>React 18, Styled Components, React Router, Axios</TechDescription>
          </TechItem>
          <TechItem>
            <TechName>Backend</TechName>
            <TechDescription>Node.js, Express.js, MongoDB, Mongoose</TechDescription>
          </TechItem>
          <TechItem>
            <TechName>Search Engine</TechName>
            <TechDescription>Fuse.js for fuzzy search and relevance scoring</TechDescription>
          </TechItem>
          <TechItem>
            <TechName>Authentication</TechName>
            <TechDescription>JWT tokens, bcrypt for password hashing</TechDescription>
          </TechItem>
          <TechItem>
            <TechName>File Storage</TechName>
            <TechDescription>Firebase Storage for image uploads</TechDescription>
          </TechItem>
          <TechItem>
            <TechName>Validation</TechName>
            <TechDescription>Express-validator for request validation</TechDescription>
          </TechItem>
        </TechStack>
      </Section>

      {/* API Endpoints */}
      <Section>
        <SectionTitle>
          <FaDatabase /> API Endpoints Reference
        </SectionTitle>

        {/* GET /api/items */}
        <EndpointSection>
          <EndpointTitle>
            <MethodBadge method="GET">GET</MethodBadge>
            <EndpointPath>/api/items</EndpointPath>
          </EndpointTitle>
          <EndpointDescription>
            Retrieve all items with pagination and sorting options.
          </EndpointDescription>
          
          <h4>Query Parameters:</h4>
          <ParametersTable>
            <thead>
              <tr>
                <TableHeader>Parameter</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Default</TableHeader>
                <TableHeader>Description</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>page</TableCell>
                <TableCell>number</TableCell>
                <TableCell>1</TableCell>
                <TableCell>Page number for pagination</TableCell>
              </tr>
              <tr>
                <TableCell>limit</TableCell>
                <TableCell>number</TableCell>
                <TableCell>10</TableCell>
                <TableCell>Number of items per page</TableCell>
              </tr>
              <tr>
                <TableCell>sortBy</TableCell>
                <TableCell>string</TableCell>
                <TableCell>relevance</TableCell>
                <TableCell>Sort order: relevance, price-low, price-high, name, newest</TableCell>
              </tr>
            </tbody>
          </ParametersTable>

          <ResponseTitle>Example Response:</ResponseTitle>
          <CodeBlock>{`{
  "items": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Samsung Galaxy S24 Ultra",
      "description": "Latest flagship smartphone...",
      "price": 1199.99,
      "image": "https://example.com/image.jpg",
      "category": "Electronics",
      "inStock": true,
      "rating": 4.8,
      "reviews": 1250,
      "createdAt": "2023-09-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}`}</CodeBlock>
        </EndpointSection>

        {/* GET /api/items/search */}
        <EndpointSection>
          <EndpointTitle>
            <MethodBadge method="GET">GET</MethodBadge>
            <EndpointPath>/api/items/search</EndpointPath>
          </EndpointTitle>
          <EndpointDescription>
            Search items using fuzzy search with advanced filtering and sorting.
          </EndpointDescription>
          
          <h4>Query Parameters:</h4>
          <ParametersTable>
            <thead>
              <tr>
                <TableHeader>Parameter</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Description</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>q</TableCell>
                <TableCell>string</TableCell>
                <TableCell>Search query (supports fuzzy matching)</TableCell>
              </tr>
              <tr>
                <TableCell>page</TableCell>
                <TableCell>number</TableCell>
                <TableCell>Page number for pagination</TableCell>
              </tr>
              <tr>
                <TableCell>limit</TableCell>
                <TableCell>number</TableCell>
                <TableCell>Number of items per page</TableCell>
              </tr>
              <tr>
                <TableCell>category</TableCell>
                <TableCell>string</TableCell>
                <TableCell>Filter by category (electronics, clothing, home, etc.)</TableCell>
              </tr>
              <tr>
                <TableCell>priceRange</TableCell>
                <TableCell>string</TableCell>
                <TableCell>Price range filter (under-25, under-50, 25-50, etc.)</TableCell>
              </tr>
              <tr>
                <TableCell>inStock</TableCell>
                <TableCell>boolean</TableCell>
                <TableCell>Filter by stock availability</TableCell>
              </tr>
              <tr>
                <TableCell>sortBy</TableCell>
                <TableCell>string</TableCell>
                <TableCell>Sort order: relevance, price-low, price-high, name, newest</TableCell>
              </tr>
            </tbody>
          </ParametersTable>

          <ResponseTitle>Example Request:</ResponseTitle>
          <CodeBlock>{`GET /api/items/search?q=applee&category=electronics&priceRange=under-1000&sortBy=relevance&page=1&limit=10`}</CodeBlock>

          <ResponseTitle>Example Response:</ResponseTitle>
          <CodeBlock>{`{
  "items": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Apple MacBook Pro 16-inch",
      "description": "Professional laptop with M3 Pro chip...",
      "price": 2499.99,
      "image": "https://example.com/macbook.jpg",
      "category": "Electronics",
      "inStock": true,
      "rating": 4.9,
      "reviews": 890
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  },
  "filters": {
    "category": "electronics",
    "priceRange": "under-1000",
    "inStock": null
  },
  "sortBy": "relevance"
}`}</CodeBlock>
        </EndpointSection>

        {/* POST /api/items */}
        <EndpointSection>
          <EndpointTitle>
            <MethodBadge method="POST">POST</MethodBadge>
            <EndpointPath>/api/items</EndpointPath>
          </EndpointTitle>
          <EndpointDescription>
            Create a new item. Requires admin authentication.
          </EndpointDescription>
          
          <h4>Request Body:</h4>
          <CodeBlock>{`{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "inStock": true,
  "rating": 4.5,
  "reviews": 100
}`}</CodeBlock>

          <h4>Validation Rules:</h4>
          <ul>
            <li><strong>name:</strong> Required, 1-100 characters</li>
            <li><strong>description:</strong> Required, minimum 1 character</li>
            <li><strong>price:</strong> Required, must be a number</li>
            <li><strong>image:</strong> Required, must be a valid URL</li>
            <li><strong>category:</strong> Required, 1-50 characters</li>
          </ul>
        </EndpointSection>

        {/* PUT /api/items/:id */}
        <EndpointSection>
          <EndpointTitle>
            <MethodBadge method="PUT">PUT</MethodBadge>
            <EndpointPath>/api/items/:id</EndpointPath>
          </EndpointTitle>
          <EndpointDescription>
            Update an existing item. Requires admin authentication.
          </EndpointDescription>
          
          <h4>Request Body:</h4>
          <CodeBlock>{`{
  "name": "Updated Product Name",
  "description": "Updated description",
  "price": 149.99,
  "inStock": false
}`}</CodeBlock>
        </EndpointSection>

        {/* DELETE /api/items/:id */}
        <EndpointSection>
          <EndpointTitle>
            <MethodBadge method="DELETE">DELETE</MethodBadge>
            <EndpointPath>/api/items/:id</EndpointPath>
          </EndpointTitle>
          <EndpointDescription>
            Delete an item. Requires admin authentication.
          </EndpointDescription>
        </EndpointSection>

        {/* POST /api/items/upload */}
        <EndpointSection>
          <EndpointTitle>
            <MethodBadge method="POST">POST</MethodBadge>
            <EndpointPath>/api/items/upload</EndpointPath>
          </EndpointTitle>
          <EndpointDescription>
            Upload multiple items via JSON. Requires admin authentication.
          </EndpointDescription>
          
          <h4>Request Body:</h4>
          <CodeBlock>{`{
  "items": [
    {
      "name": "Product 1",
      "description": "Description 1",
      "price": 99.99,
      "image": "https://example.com/image1.jpg",
      "category": "Electronics",
      "inStock": true
    },
    {
      "name": "Product 2",
      "description": "Description 2",
      "price": 199.99,
      "image": "https://example.com/image2.jpg",
      "category": "Clothing",
      "inStock": true
    }
  ]
}`}</CodeBlock>
        </EndpointSection>

        {/* POST /api/items/seed */}
        <EndpointSection>
          <EndpointTitle>
            <MethodBadge method="POST">POST</MethodBadge>
            <EndpointPath>/api/items/seed</EndpointPath>
          </EndpointTitle>
          <EndpointDescription>
            Seed the database with sample data. Requires admin authentication.
          </EndpointDescription>
        </EndpointSection>

        {/* DELETE /api/items/clear */}
        <EndpointSection>
          <EndpointTitle>
            <MethodBadge method="DELETE">DELETE</MethodBadge>
            <EndpointPath>/api/items/clear</EndpointPath>
          </EndpointTitle>
          <EndpointDescription>
            Clear all items from the database. Requires admin authentication.
          </EndpointDescription>
        </EndpointSection>

        {/* GET /api/items/all */}
        <EndpointSection>
          <EndpointTitle>
            <MethodBadge method="GET">GET</MethodBadge>
            <EndpointPath>/api/items/all</EndpointPath>
          </EndpointTitle>
          <EndpointDescription>
            Get all items without pagination (for similarity search and other operations).
          </EndpointDescription>
        </EndpointSection>
      </Section>

      {/* Authentication */}
      <Section>
        <SectionTitle>
          <FaLock /> Authentication & Security
        </SectionTitle>
        <FeatureCard>
          <FeatureTitle>
            <FaLock /> Admin Authentication
          </FeatureTitle>
          <FeatureDescription>
            The application uses JWT (JSON Web Tokens) for admin authentication. Admin routes are protected and require a valid token in the Authorization header.
          </FeatureDescription>
        </FeatureCard>
        
        <h4>Protected Endpoints:</h4>
        <ul>
          <li>POST /api/items - Create new item</li>
          <li>PUT /api/items/:id - Update item</li>
          <li>DELETE /api/items/:id - Delete item</li>
          <li>POST /api/items/upload - Bulk upload</li>
          <li>POST /api/items/seed - Seed database</li>
          <li>DELETE /api/items/clear - Clear database</li>
        </ul>

        <h4>Authentication Header:</h4>
        <CodeBlock>{`Authorization: Bearer <your-jwt-token>`}</CodeBlock>
      </Section>

      {/* Error Handling */}
      <Section>
        <SectionTitle>
          <FaCode /> Error Handling
        </SectionTitle>
        <FeatureCard>
          <FeatureTitle>Standard Error Response Format</FeatureTitle>
          <CodeBlock>{`{
  "error": "Error message description",
  "status": 400,
  "timestamp": "2023-09-01T10:00:00.000Z"
}`}</CodeBlock>
        </FeatureCard>

        <h4>Common HTTP Status Codes:</h4>
        <ul>
          <li><strong>200:</strong> Success</li>
          <li><strong>201:</strong> Created</li>
          <li><strong>400:</strong> Bad Request (validation errors)</li>
          <li><strong>401:</strong> Unauthorized (invalid/missing token)</li>
          <li><strong>404:</strong> Not Found</li>
          <li><strong>500:</strong> Internal Server Error</li>
        </ul>
      </Section>
    </DocumentationContainer>
  );
};

export default DocumentationPage;
