const generateRideSharingMock = () => {
  const nodes = [];
  const edges = [];
  const yOffset = 100;
  const xCenter = 400;

  // 1. Independent Nodes
  nodes.push({ id: 'mobile', type: 'microservice', position: { x: xCenter - 300, y: yOffset + 240 }, data: { label: 'Mobile App', color: '#444', iconType: 'smartphone' } });
  nodes.push({ id: 'gateway', type: 'microservice', position: { x: xCenter - 150, y: yOffset + 240 }, data: { label: 'API Gateway', color: '#ec4899', iconType: 'route' } });
  edges.push({ id: 'e-mob-gw', source: 'mobile', sourceHandle: 'right', target: 'gateway', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

  // 2. Central Column Bounded Contexts
  // RIDE SERVICE
  nodes.push({ id: 'g-ride', type: 'boundedContext', position: { x: xCenter + 50, y: yOffset }, data: { label: 'Ride Service', color: '#a855f7', width: 300, height: 260 } });
  nodes.push({ id: 'api-ride', type: 'microservice', position: { x: 40, y: 140 }, parentId: 'g-ride', extent: 'parent', data: { label: 'API', color: '#f97316', iconType: 'server' } });
  nodes.push({ id: 'db-ride', type: 'database', position: { x: 180, y: 160 }, parentId: 'g-ride', extent: 'parent', data: { label: 'DB', color: '#3b82f6', iconType: 'database' } });
  nodes.push({ id: 'lam-ride', type: 'microservice', position: { x: 180, y: 40 }, parentId: 'g-ride', extent: 'parent', data: { label: 'Matching', color: '#f97316', iconType: 'lambda' } });
  
  edges.push({ id: 'eg-gw-ride', source: 'gateway', sourceHandle: 'right', target: 'api-ride', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
  edges.push({ id: 'er-api-db', source: 'api-ride', sourceHandle: 'right', target: 'db-ride', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
  edges.push({ id: 'er-api-lam', source: 'api-ride', sourceHandle: 'top', target: 'lam-ride', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

  // PAYMENT SERVICE
  nodes.push({ id: 'g-pay', type: 'boundedContext', position: { x: xCenter + 50, y: yOffset + 280 }, data: { label: 'Payment Service', color: '#f59e0b', width: 260, height: 160 } });
  nodes.push({ id: 'api-pay', type: 'microservice', position: { x: 40, y: 60 }, parentId: 'g-pay', extent: 'parent', data: { label: 'API', color: '#f97316', iconType: 'server' } });
  nodes.push({ id: 'db-pay', type: 'database', position: { x: 160, y: 60 }, parentId: 'g-pay', extent: 'parent', data: { label: 'DB', color: '#3b82f6', iconType: 'database' } });

  edges.push({ id: 'eg-gw-pay', source: 'gateway', sourceHandle: 'right', target: 'api-pay', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
  edges.push({ id: 'ep-api-db', source: 'api-pay', sourceHandle: 'right', target: 'db-pay', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
  
  // Cross-group: Ride API -> Payment API
  edges.push({ id: 'ec-ride-pay', source: 'api-ride', sourceHandle: 'bottom', target: 'api-pay', targetHandle: 'top', type: 'smoothstep', animated: false, label: 'process fare', style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

  // USER SERVICE
  nodes.push({ id: 'g-user', type: 'boundedContext', position: { x: xCenter + 50, y: yOffset + 460 }, data: { label: 'User Service', color: '#3b82f6', width: 260, height: 160 } });
  nodes.push({ id: 'api-user', type: 'microservice', position: { x: 40, y: 50 }, parentId: 'g-user', extent: 'parent', data: { label: 'API', color: '#f97316', iconType: 'server' } });
  nodes.push({ id: 'db-user', type: 'database', position: { x: 160, y: 50 }, parentId: 'g-user', extent: 'parent', data: { label: 'DB', color: '#3b82f6', iconType: 'database' } });

  edges.push({ id: 'eg-gw-user', source: 'gateway', sourceHandle: 'right', target: 'api-user', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
  edges.push({ id: 'eu-api-db', source: 'api-user', sourceHandle: 'right', target: 'db-user', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

  // 3. Right Column
  // DRIVER SERVICE
  nodes.push({ id: 'g-drv', type: 'boundedContext', position: { x: xCenter + 550, y: yOffset - 50 }, data: { label: 'Driver Service', color: '#22c55e', width: 240, height: 250 } });
  nodes.push({ id: 'api-drv', type: 'microservice', position: { x: 30, y: 100 }, parentId: 'g-drv', extent: 'parent', data: { label: 'API', color: '#f97316', iconType: 'server' } });
  nodes.push({ id: 'db-drv', type: 'database', position: { x: 140, y: 30 }, parentId: 'g-drv', extent: 'parent', data: { label: 'DB', color: '#3b82f6', iconType: 'database' } });
  nodes.push({ id: 'red-drv', type: 'database', position: { x: 140, y: 150 }, parentId: 'g-drv', extent: 'parent', data: { label: 'Redis', color: '#3b82f6', iconType: 'database' } });

  edges.push({ id: 'ed-api-db', source: 'api-drv', sourceHandle: 'right', target: 'db-drv', targetHandle: 'bottom', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
  edges.push({ id: 'ed-api-red', source: 'api-drv', sourceHandle: 'right', target: 'red-drv', targetHandle: 'top', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

  // Cross-group: Matching -> Driver API
  edges.push({ id: 'ec-lam-drv', source: 'lam-ride', sourceHandle: 'right', target: 'api-drv', targetHandle: 'top', type: 'smoothstep', animated: false, label: 'assign driver', style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
  edges.push({ id: 'ec-lam-drv2', source: 'lam-ride', sourceHandle: 'bottom', target: 'red-drv', targetHandle: 'left', type: 'smoothstep', animated: false, label: 'find nearby drivers', style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
  
  // NOTIFICATION SERVICE
  nodes.push({ id: 'g-not', type: 'boundedContext', position: { x: xCenter + 550, y: yOffset + 380 }, data: { label: 'Notification Service', color: '#ef4444', width: 260, height: 160 } });
  nodes.push({ id: 'api-not', type: 'microservice', position: { x: 40, y: 50 }, parentId: 'g-not', extent: 'parent', data: { label: 'API', color: '#f97316', iconType: 'server' } });
  nodes.push({ id: 'sns-not', type: 'database', position: { x: 160, y: 50 }, parentId: 'g-not', extent: 'parent', data: { label: 'SNS', color: '#ec4899', iconType: 'filter' } });

  edges.push({ id: 'en-api-sns', source: 'api-not', sourceHandle: 'right', target: 'sns-not', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

  // Cross-group: Ride API -> Notification API
  edges.push({ id: 'ec-ride-not', source: 'api-ride', sourceHandle: 'right', target: 'api-not', targetHandle: 'left', type: 'smoothstep', animated: false, label: 'ride updates', style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
  
  // Cross-group: User API -> Notification API
  edges.push({ id: 'ec-user-not', source: 'api-user', sourceHandle: 'right', target: 'api-not', targetHandle: 'bottom', type: 'smoothstep', animated: false, label: 'account alerts', style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

  // Stripe
  nodes.push({ id: 'stripe', type: 'microservice', position: { x: xCenter + 350, y: yOffset + 330 }, data: { label: 'Stripe', color: '#444', iconType: 'card' } });
  edges.push({ id: 'ec-pay-stripe', source: 'api-pay', sourceHandle: 'right', target: 'stripe', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

  const msg = `**1. Architecture Overview**
A highly scalable Ride-Sharing Platform utilizing a Microservices Architecture pattern with geolocation and real-time connectivity.

**2. Component List**
- Mobile App (Frontend)
- API Gateway
- Ride Service (API, DB, Matching Engine)
- Driver Service (API, DB, Redis)
- Payment Service (API, DB)
- Notification Service (API, SNS)
- Stripe Integration

**3. Detailed Explanation of Each Component**
**API Gateway**
- **Description:** Central traffic coordinator.
- **Why used:** Secures the internal network and handles mobile authentication.
- **Interaction:** Forwards traffic to Ride, Payment, and User Services.

**Ride Service (Matching)**
- **Description:** Core algorithm processing geolocation data to assign rides.
- **Why used:** Enables lightning-fast distance computations.
- **Interaction:** Interacts with Driver Service Redis cache to find nearest available cars.

**4. Data Flow Description**
User requests ride via Mobile App -> API Gateway -> Ride Service writes to DB and triggers Matching Node -> Matches with Driver Service -> Sends alert via Notification Service.

**5. Optional Enhancements**
- Add Kafka for asynchronous trip data analysis.
- Implement GraphQL at the gateway layer.`;

  return { replace: true, nodes, edges, message: msg };
};


const generateScalableEcommerceMock = () => {
    const nodes = [];
    const edges = [];
    const xCenter = 500;
    const yOffset = 150;

    // Title
    nodes.push({ id: 'title', type: 'text', position: { x: xCenter - 100, y: 0 }, data: { label: 'Scalable E-commerce Platform Architecture', fontSize: '1.8rem', fontWeight: 'bold' } });
    nodes.push({ id: 'subtitle', type: 'text', position: { x: xCenter + 30, y: 40 }, data: { label: 'Support thousands of users', fontSize: '1rem', color: '#888' } });

    // Left Column
    nodes.push({ id: 'web', type: 'microservice', position: { x: xCenter - 550, y: 100 }, data: { label: 'Web Frontend', color: '#8b5cf6', iconType: 'monitor' } });
    nodes.push({ id: 'mob', type: 'microservice', position: { x: xCenter - 550, y: 280 }, data: { label: 'Mobile App', color: '#3b82f6', iconType: 'smartphone' } });
    nodes.push({ id: 'gw', type: 'microservice', position: { x: xCenter - 340, y: 190 }, data: { label: 'API Gateway', color: '#ec4899', iconType: 'network' } });

    edges.push({ id: 'e-web-gw', source: 'web', sourceHandle: 'right', target: 'gw', targetHandle: 'left', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    edges.push({ id: 'e-mob-gw', source: 'mob', sourceHandle: 'right', target: 'gw', targetHandle: 'left', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });

    // Infra Column Left-Middle
    nodes.push({ id: 'lb-left', type: 'boundedContext', position: { x: xCenter - 550, y: 450 }, data: { label: 'Load Balancer', color: '#475569', width: 200, height: 80, icon: false } });
    nodes.push({ id: 'asg-left', type: 'boundedContext', position: { x: xCenter - 550, y: 580 }, data: { label: 'Auto Scaling', color: '#475569', width: 200, height: 80, icon: false } });
    nodes.push({ id: 'mon-left', type: 'boundedContext', position: { x: xCenter - 550, y: 710 }, data: { label: 'Monitoring', color: '#475569', width: 200, height: 80, icon: false } });
    edges.push({ id: 'e-lb-asg', source: 'lb-left', sourceHandle: 'bottom', target: 'asg-left', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    edges.push({ id: 'e-asg-mon', source: 'asg-left', sourceHandle: 'bottom', target: 'mon-left', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    
    // Top Infra Box
    nodes.push({ id: 'lb-top', type: 'boundedContext', position: { x: xCenter - 80, y: 80 }, data: { label: 'Load Balancer', color: '#3b82f6', width: 220, height: 80, icon: false } });
    nodes.push({ id: 'mon-top', type: 'boundedContext', position: { x: xCenter + 220, y: 80 }, data: { label: 'Alerting', color: '#a855f7', width: 220, height: 80, icon: false } });
    nodes.push({ id: 'asg-top', type: 'boundedContext', position: { x: xCenter - 20, y: 220 }, data: { label: 'Auto Scaling Group', color: '#22c55e', width: 400, height: 80, icon: false } });

    edges.push({ id: 'e-lb-top-asg', source: 'lb-top', sourceHandle: 'bottom', target: 'asg-top', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    edges.push({ id: 'e-mon-top-asg', source: 'mon-top', sourceHandle: 'bottom', target: 'asg-top', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    
    // Connect GW to Infra
    edges.push({ id: 'e-gw-lbtop', source: 'gw', sourceHandle: 'top', target: 'lb-top', targetHandle: 'left', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    edges.push({ id: 'e-gw-asgtop', source: 'gw', sourceHandle: 'right', target: 'asg-top', targetHandle: 'left', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    // Microservices Group
    const servicesY = 400;
    
    nodes.push({ id: 'g-prod', type: 'boundedContext', position: { x: xCenter - 340, y: servicesY }, data: { label: 'Product Catalog', color: '#22c55e', width: 280, height: 180 } });
    nodes.push({ id: 'api-prod', type: 'microservice', position: { x: 15, y: 50 }, parentId: 'g-prod', extent: 'parent', data: { label: 'API', color: '#22c55e', iconType: 'box' } });
    nodes.push({ id: 'db-prod', type: 'database', position: { x: 160, y: 50 }, parentId: 'g-prod', extent: 'parent', data: { label: 'DB', color: '#22c55e' } });
    
    nodes.push({ id: 'g-cart', type: 'boundedContext', position: { x: xCenter - 10, y: servicesY }, data: { label: 'Shopping Cart', color: '#06b6d4', width: 420, height: 180 } });
    nodes.push({ id: 'api-cart', type: 'microservice', position: { x: 15, y: 50 }, parentId: 'g-cart', extent: 'parent', data: { label: 'API', color: '#06b6d4', iconType: 'cart' } });
    nodes.push({ id: 'red-cart', type: 'database', position: { x: 160, y: 50 }, parentId: 'g-cart', extent: 'parent', data: { label: 'Redis', color: '#06b6d4' } });
    nodes.push({ id: 'msg-cart', type: 'microservice', position: { x: 275, y: 50 }, parentId: 'g-cart', extent: 'parent', data: { label: 'Messaging', color: '#06b6d4', iconType: 'zap' } });

    nodes.push({ id: 'g-pay', type: 'boundedContext', position: { x: xCenter + 440, y: servicesY }, data: { label: 'Payment Gateway', color: '#d946ef', width: 420, height: 180 } });
    nodes.push({ id: 'api-pay', type: 'microservice', position: { x: 15, y: 50 }, parentId: 'g-pay', extent: 'parent', data: { label: 'API', color: '#d946ef', iconType: 'server' } });
    nodes.push({ id: 'db-pay', type: 'database', position: { x: 160, y: 50 }, parentId: 'g-pay', extent: 'parent', data: { label: 'DB', color: '#3b82f6' } });
    nodes.push({ id: 'str-pay', type: 'microservice', position: { x: 275, y: 50 }, parentId: 'g-pay', extent: 'parent', data: { label: 'Stripe', color: '#d946ef', iconType: 'card' } });

    edges.push({ id: 'e-asg-prod', source: 'asg-top', sourceHandle: 'bottom', target: 'api-prod', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    edges.push({ id: 'e-asg-cart', source: 'asg-top', sourceHandle: 'bottom', target: 'api-cart', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    edges.push({ id: 'e-asg-pay', source: 'asg-top', sourceHandle: 'bottom', target: 'api-pay', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });

    nodes.push({ id: 'g-search', type: 'boundedContext', position: { x: xCenter - 340, y: 640 }, data: { label: 'Search Service', color: '#3b82f6', width: 280, height: 180 } });
    nodes.push({ id: 'api-src', type: 'microservice', position: { x: 15, y: 50 }, parentId: 'g-search', extent: 'parent', data: { label: 'API', color: '#3b82f6', iconType: 'search' } });
    nodes.push({ id: 'db-src', type: 'database', position: { x: 160, y: 50 }, parentId: 'g-search', extent: 'parent', data: { label: 'Search', color: '#3b82f6' } });
    
    edges.push({ id: 'e-prod-src', source: 'api-prod', sourceHandle: 'bottom', target: 'api-src', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });

    // Observability Level
    nodes.push({ id: 'dist-trac', type: 'boundedContext', position: { x: xCenter - 20, y: 880 }, data: { label: 'Distributed Tracing', color: '#6366f1', width: 240, height: 70, icon: false } });
    nodes.push({ id: 'cent-log', type: 'boundedContext', position: { x: xCenter + 260, y: 880 }, data: { label: 'Centralized Logging', color: '#ec4899', width: 230, height: 70, icon: false } });
    nodes.push({ id: 'metrics', type: 'boundedContext', position: { x: xCenter + 530, y: 880 }, data: { label: 'System Metrics', color: '#10b981', width: 230, height: 70, icon: false } });
    
    // Top Right Cloud Services
    nodes.push({ id: 'usr-ana', type: 'microservice', position: { x: xCenter + 920, y: 15 }, data: { label: 'User Analytics', color: '#22c55e', iconType: 'chart' } });
    nodes.push({ id: 'notif', type: 'microservice', position: { x: xCenter + 1080, y: 15 }, data: { label: 'Notification', color: '#f97316', iconType: 'bell' } });
    nodes.push({ id: 'c-store', type: 'database', position: { x: xCenter + 920, y: 180 }, data: { label: 'Cloud Storage', color: '#3b82f6', iconType: 'cloud' } });
    nodes.push({ id: 'cdn', type: 'microservice', position: { x: xCenter + 1080, y: 180 }, data: { label: 'CDN Element', color: '#0ea5e9', iconType: 'network' } });

    edges.push({ id: 'e-gw-cloud', source: 'gw', sourceHandle: 'top', target: 'c-store', targetHandle: 'left', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    
    // Connect Web to CDN
    edges.push({ id: 'e-web-cdn', source: 'web', sourceHandle: 'top', target: 'cdn', targetHandle: 'left', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    
    // Connect Product DB to Cloud Storage
    edges.push({ id: 'e-prod-cstore', source: 'db-prod', sourceHandle: 'top', target: 'c-store', targetHandle: 'left', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });

    // Connect Gateway to User Analytics
    edges.push({ id: 'e-gw-usr', source: 'gw', sourceHandle: 'right', target: 'usr-ana', targetHandle: 'left', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    
    // Connect Shopping Cart to Notification 
    edges.push({ id: 'e-msg-notif', source: 'msg-cart', sourceHandle: 'top', target: 'notif', targetHandle: 'bottom', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    
    // Observability Pipelines
    edges.push({ id: 'e-gw-dist', source: 'gw', sourceHandle: 'bottom', target: 'dist-trac', targetHandle: 'left', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    edges.push({ id: 'e-src-log', source: 'api-src', sourceHandle: 'right', target: 'cent-log', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });
    edges.push({ id: 'e-pay-met', source: 'api-pay', sourceHandle: 'right', target: 'metrics', targetHandle: 'top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5', stroke: '#888' } });

    const msg = `**1. Architecture Overview**
A highly scalable E-commerce Platform designed to handle thousands of concurrent users using an API Gateway and Microservices.

**2. Component List**
- Web/Mobile Frontend
- API Gateway
- Product Catalog, Shopping Cart, Payment Gateway, Search Services
- Load Balancers & Auto Scaling
- Observability (Distributed Tracing, Logging, Metrics)
- Cloud CDN & Storage

**3. Detailed Explanation of Each Component**
**API Gateway**
- **Description:** Entry point for all client requests.
- **Why used:** Centralizes routing, rate limiting, and security.
- **Interaction:** Forwards requests to specific microservices like Product or Cart.

**Shopping Cart Service**
- **Description:** Manages active user sessions and items.
- **Why used:** Provides fast write-heavy operations.
- **Interaction:** Uses Redis for state and Messaging queue to trigger notifications.

**4. Data Flow Description**
User accesses the App -> API Gateway routes request -> Product Service retrieves catalog data -> Shopping Cart orchestrates order -> Payment Gateway matches Stripe integration -> Messaging queue sends Notification.

**5. Optional Enhancements**
- Implement an Event-Driven Architecture for inventory sync.
- Add AI recommendation engine pipelines.`;

    return { replace: true, nodes, edges, message: msg };
}

const generateLearningPlatformMock = () => {
    const nodes = [];
    const edges = [];
    const xCenter = 500;
    const yOffset = 150;

    // Title
    nodes.push({ id: 'title', type: 'text', position: { x: xCenter - 100, y: 0 }, data: { label: 'Online Learning Platform Architecture', fontSize: '1.8rem', fontWeight: 'bold' } });
    nodes.push({ id: 'subtitle', type: 'text', position: { x: xCenter + 10, y: 40 }, data: { label: 'Scale to millions of global students', fontSize: '1rem', color: '#888' } });

    // Entry
    nodes.push({ id: 'web', type: 'microservice', position: { x: xCenter - 450, y: 100 }, data: { label: 'Web Platform', color: '#8b5cf6', iconType: 'monitor' } });
    nodes.push({ id: 'mob', type: 'microservice', position: { x: xCenter - 450, y: 250 }, data: { label: 'Mobile App', color: '#3b82f6', iconType: 'smartphone' } });
    nodes.push({ id: 'gw', type: 'microservice', position: { x: xCenter - 300, y: 175 }, data: { label: 'API Gateway', color: '#ec4899', iconType: 'route' } });

    edges.push({ id: 'e-web-gw', source: 'web', sourceHandle: 'right', target: 'gw', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
    edges.push({ id: 'e-mob-gw', source: 'mob', sourceHandle: 'right', target: 'gw', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

    // Top Infra Box
    nodes.push({ id: 'cdn', type: 'boundedContext', position: { x: xCenter - 50, y: 120 }, data: { label: 'Video CDN Edge Layer', color: '#3b82f6', width: 320, height: 70, icon: false } });
    edges.push({ id: 'e-gw-cdn', source: 'gw', sourceHandle: 'top', target: 'cdn', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

    // Microservices Group
    const servicesY = 250;
    
    // Core Learning Services
    nodes.push({ id: 'g-course', type: 'boundedContext', position: { x: xCenter - 150, y: servicesY }, data: { label: 'Course Management', color: '#22c55e', width: 220, height: 160 } });
    nodes.push({ id: 'api-course', type: 'microservice', position: { x: 20, y: 60 }, parentId: 'g-course', extent: 'parent', data: { label: 'API', color: '#22c55e', iconType: 'server' } });
    nodes.push({ id: 'db-course', type: 'database', position: { x: 120, y: 60 }, parentId: 'g-course', extent: 'parent', data: { label: 'Syllabus DB', color: '#22c55e', iconType: 'database' } });
    
    nodes.push({ id: 'g-quiz', type: 'boundedContext', position: { x: xCenter + 100, y: servicesY }, data: { label: 'Quiz & Exam System', color: '#f59e0b', width: 220, height: 160 } });
    nodes.push({ id: 'api-quiz', type: 'microservice', position: { x: 20, y: 60 }, parentId: 'g-quiz', extent: 'parent', data: { label: 'Assessment', color: '#f59e0b', iconType: 'server' } });
    nodes.push({ id: 'db-quiz', type: 'database', position: { x: 120, y: 60 }, parentId: 'g-quiz', extent: 'parent', data: { label: 'Results DB', color: '#f59e0b', iconType: 'database' } });

    nodes.push({ id: 'g-vid', type: 'boundedContext', position: { x: xCenter + 350, y: servicesY }, data: { label: 'Video Streaming Service', color: '#ef4444', width: 220, height: 160 } });
    nodes.push({ id: 'api-vid', type: 'microservice', position: { x: 20, y: 60 }, parentId: 'g-vid', extent: 'parent', data: { label: 'Transcode', color: '#ef4444', iconType: 'activity' } });
    nodes.push({ id: 'store-vid', type: 'database', position: { x: 120, y: 60 }, parentId: 'g-vid', extent: 'parent', data: { label: 'S3 Store', color: '#ef4444', iconType: 'cloud' } });

    edges.push({ id: 'e-gw-course', source: 'gw', sourceHandle: 'right', target: 'api-course', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
    edges.push({ id: 'e-gw-quiz', source: 'gw', sourceHandle: 'right', target: 'api-quiz', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
    edges.push({ id: 'e-gw-vid', source: 'gw', sourceHandle: 'right', target: 'api-vid', targetHandle: 'bottom', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

    // Bottom Support / Analytics Layer
    const botY = 480;

    nodes.push({ id: 'g-rec', type: 'boundedContext', position: { x: xCenter - 150, y: botY }, data: { label: 'ML Recommendations', color: '#a855f7', width: 220, height: 160 } });
    nodes.push({ id: 'api-rec', type: 'microservice', position: { x: 10, y: 60 }, parentId: 'g-rec', extent: 'parent', data: { label: 'Inference', color: '#a855f7', iconType: 'activity' } });
    nodes.push({ id: 'db-rec', type: 'database', position: { x: 110, y: 60 }, parentId: 'g-rec', extent: 'parent', data: { label: 'Vector DB', color: '#a855f7', iconType: 'database' } });

    nodes.push({ id: 'g-ana', type: 'boundedContext', position: { x: xCenter + 100, y: botY }, data: { label: 'User Analytics', color: '#06b6d4', width: 220, height: 160 } });
    nodes.push({ id: 'api-ana', type: 'microservice', position: { x: 20, y: 60 }, parentId: 'g-ana', extent: 'parent', data: { label: 'Tracking', color: '#06b6d4', iconType: 'chart' } });
    nodes.push({ id: 'db-ana', type: 'database', position: { x: 120, y: 60 }, parentId: 'g-ana', extent: 'parent', data: { label: 'Data Lake', color: '#06b6d4', iconType: 'database' } });

    nodes.push({ id: 'g-chat', type: 'boundedContext', position: { x: xCenter + 350, y: botY }, data: { label: 'Chat Support System', color: '#8b5cf6', width: 220, height: 160 } });
    nodes.push({ id: 'api-chat', type: 'microservice', position: { x: 20, y: 60 }, parentId: 'g-chat', extent: 'parent', data: { label: 'WebSocket', color: '#8b5cf6', iconType: 'network' } });
    nodes.push({ id: 'db-chat', type: 'database', position: { x: 120, y: 60 }, parentId: 'g-chat', extent: 'parent', data: { label: 'Redis', color: '#8b5cf6', iconType: 'database' } });

    edges.push({ id: 'e-course-rec', source: 'db-course', sourceHandle: 'bottom', target: 'api-rec', targetHandle: 'top', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
    edges.push({ id: 'e-gw-chat', source: 'gw', sourceHandle: 'bottom', target: 'api-chat', targetHandle: 'left', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });
    edges.push({ id: 'e-quiz-ana', source: 'db-quiz', sourceHandle: 'bottom', target: 'api-ana', targetHandle: 'top', type: 'smoothstep', animated: false, style: { stroke: '#fff', strokeWidth: 1.5 }, borderRadius: 15 });

    const msg = `**1. Architecture Overview**
A global Online Learning Platform capable of scaling to millions of students, utilizing edge CDNs and decoupled video streaming modules.

**2. Component List**
- Web/Mobile Clients
- API Gateway & CDN Edge Layer
- Course Management Service
- Quiz & Exam System
- Video Streaming Service
- ML Recommendations & Analytics
- Chat Support System

**3. Detailed Explanation of Each Component**
**Video Streaming Service**
- **Description:** Transcodes and delivers high-quality video content.
- **Why used:** Optimizes playback across devices and network conditions.
- **Interaction:** Uses S3 for raw storage and Edge CDN for rapid global delivery.

**ML Recommendations**
- **Description:** Inference engine for personalization.
- **Why used:** Suggests courses based on student progression and grades.
- **Interaction:** Uses Vector DB connected to Syllabus mapping events.

**4. Data Flow Description**
Student logs in -> Gateway passes auth -> Requests video via Edge CDN -> CDN fetches from S3 on cache miss. Background task: Analytics Service tracks watch time -> updates Vector DB -> triggers Recommendation Engine.

**5. Optional Enhancements**
- Implement Serverless Lambdas for quiz auto-grading.
- Add live WebRTC modules for live-streaming classes.`;

    return { replace: true, nodes, edges, message: msg };
}

export const analyzePromptAndGenerateArchitecture = (prompt, existingNodes, existingEdges) => {
  const p = prompt.toLowerCase();
  
  if (p.includes('ride') || p.includes('driver')) {
      return generateRideSharingMock();
  }

  if (p.includes('learning') || p.includes('online learning') || p.includes('course') || p.includes('video')) {
      return generateLearningPlatformMock();
  }

  if (p.includes('ecommerce') || p.includes('e-commerce') || p.includes('shopping')) {
      return generateScalableEcommerceMock();
  }
  
  const isComplex = p.length > 50 || p.includes('platform') || p.includes('architecture') || p.includes('system');
  
  if (isComplex) {
    // Generate an entirely new architecture map based on keyword matching
    const newNodes = [];
    const newEdges = [];
    
    let yOffset = 100;
    let xCenter = 400;

    // Entry points
    const hasMobile = p.includes('mobile');
    const hasWeb = p.includes('web');

    if (hasWeb) {
      newNodes.push({
        id: 'web-frontend',
        type: 'microservice',
        position: { x: xCenter - 300, y: yOffset - 100 },
        data: { label: 'Web Frontend', color: 'var(--primary)' }
      });
    }
    if (hasMobile) {
      newNodes.push({
        id: 'mobile-app',
        type: 'microservice',
        position: { x: xCenter - 300, y: yOffset + 100 },
        data: { label: 'Mobile App', color: 'var(--primary)' }
      });
    }

    const entryNodeId = 'api-gateway';
    newNodes.push({
      id: entryNodeId,
      type: 'microservice',
      position: { x: xCenter - 150, y: yOffset },
      data: { label: 'API Gateway', color: '#ec4899' }
    });

    if (hasWeb) {
      newEdges.push({ id: `e-web-gw`, source: 'web-frontend', target: entryNodeId, type: 'smoothstep', animated: true, style: { stroke: 'var(--primary)' } });
    }
    if (hasMobile) {
      newEdges.push({ id: `e-mo-gw`, source: 'mobile-app', target: entryNodeId, type: 'smoothstep', animated: true, style: { stroke: 'var(--primary)' } });
    }
    
    yOffset += 180;

    let services = [];
    
    if (p.includes('payment') || p.includes('billing')) services.push({ id: 'srv-payment', label: 'Payment Service', desc: 'Stripe/PCI Compliant' });
    if (p.includes('inventory') || p.includes('stock')) services.push({ id: 'srv-inventory', label: 'Inventory Service', desc: 'Real-time Stock Mgmt' });
    if (p.includes('ecommerce') || p.includes('e-commerce') || p.includes('order')) services.push({ id: 'srv-order', label: 'Order Service', desc: 'Kafka Event Producer' });
    if (p.includes('user') || p.includes('auth') || p.includes('identity')) services.push({ id: 'srv-user', label: 'Identity Service', desc: 'OAuth2 + JWT' });
    if (p.includes('search')) services.push({ id: 'srv-search', label: 'Search Service', desc: 'Elasticsearch' });
    
    // If no specifics matched, generate some generic ones
    if (services.length === 0) {
      services.push({ id: 'srv-core', label: 'Core Backend', desc: 'Node.js/Python' });
      services.push({ id: 'srv-worker', label: 'Async Worker', desc: 'Celery/BullMQ' });
    }

    // Position services
    const spacingY = 250;
    const startX = xCenter + 100;

    services.forEach((srv, idx) => {
      const xPos = startX;
      const yPos = yOffset - 100 + (idx * spacingY);

      // 1. Group Node
      const groupId = `group-${srv.id}`;
      const colors = ['#a855f7', '#f59e0b', '#3b82f6', '#22c55e', '#ec4899'];
      const color = colors[idx % colors.length];
      
      newNodes.push({
        id: groupId,
        type: 'boundedContext',
        position: { x: xPos, y: yPos },
        data: { label: srv.label, icon: true, color: color, width: 340, height: 180 },
      });
      
      // 2. Internal API Node
      newNodes.push({
        id: srv.id,
        type: 'microservice',
        position: { x: 40, y: 60 },
        parentId: groupId,
        extent: 'parent',
        data: { label: 'API', color: color }
      });
      
      // Cross-group edge from Gateway
      newEdges.push({
        id: `e-${entryNodeId}-${srv.id}`,
        source: entryNodeId,
        sourceHandle: 'right',
        target: srv.id,
        targetHandle: 'left',
        type: 'smoothstep',
        animated: true,
        style: { stroke: 'var(--text-muted)', strokeWidth: 1.5 }
      });

      // 3. Internal DB/Cache Node
      const dbId = `db-${srv.id}`;
      newNodes.push({
        id: dbId,
        type: 'database',
        position: { x: 220, y: 60 },
        parentId: groupId,
        extent: 'parent',
        data: { label: srv.id === 'srv-search' ? 'Elasticsearch' : srv.id === 'srv-order' ? 'Redis' : 'DB', color: '#3b82f6' }
      });
      
      // Intra-group edge
      newEdges.push({
        id: `e-${srv.id}-${dbId}`,
        source: srv.id,
        sourceHandle: 'right',
        target: dbId,
        targetHandle: 'left',
        type: 'smoothstep',
        animated: true,
        style: { stroke: 'var(--text-muted)', strokeWidth: 1.5 }
      });

      // External Integrations (e.g., Stripe, Kafka)
      if (srv.id === 'srv-payment') {
         const stripeId = 'ext-stripe';
         if (!newNodes.find(n => n.id === stripeId)) {
           newNodes.push({
             id: stripeId,
             type: 'microservice',
             position: { x: xPos + 400, y: yPos + 60 },
             data: { label: 'Stripe', color: '#888' }
           });
         }
         newEdges.push({
           id: `e-${srv.id}-${stripeId}`,
           source: srv.id,
           sourceHandle: 'right',
           target: stripeId,
           targetHandle: 'left',
           type: 'smoothstep',
           animated: true,
           style: { stroke: '#888', strokeWidth: 1.5, strokeDasharray: '5,5' }
         });
      }
    });

    const msg = `**1. Architecture Overview**
A dynamically generated System Architecture perfectly aligned with your input requirements, structured around an API Gateway routing to dedicated Bounded Contexts.

**2. Component List**
- Client Layers (Web/Mobile)
- API Gateway
- Core Microservices (${services.map(s => s.label).join(', ')})
- Dedicated Datastores (DB/Caches)
- 3rd Party Integrations

**3. Detailed Explanation of Each Component**
**API Gateway**
- **Description:** Central entry routing point.
- **Why used:** Single layer of authentication and throttling.
- **Interaction:** Distributes API requests dynamically to internal Services.

**Bounded Contexts**
- **Description:** Logical groupings of functionality.
- **Why used:** Reduces monolithic coupling and isolates database layers for horizontal scaling.
- **Interaction:** Communicates via precise API boundaries or async events.

**4. Data Flow Description**
Client issues request to Gateway. Gateway matches route and forwards payload to an internal Service API. Service performs logic, mutates its isolated DB, and returns data or triggers webhooks.

**5. Optional Enhancements**
- Add Kubernetes clusters for orchestrating containers.
- Utilize zero-trust networking structures inside the VPC.`;

    return { 
      replace: true, 
      nodes: newNodes, 
      edges: newEdges,
      message: msg
    };
  } else {
    // Simple prompt (append action)
    const newNodeId = Math.random().toString(36).substr(2, 9);
    
    // Attempt to connect to the lowest node
    let highestY = 0;
    let targetParent = existingNodes.length > 0 ? existingNodes[0].id : null;
    
    existingNodes.forEach(node => {
      if (node.position.y > highestY) {
        highestY = node.position.y;
        targetParent = node.id;
      }
    });

    return {
      replace: false,
      nodes: [{
        id: newNodeId,
        type: p.includes('database') || p.includes('cache') ? 'database' : 'microservice',
        position: { x: 300, y: highestY + 150 },
        data: { label: p.length > 20 ? 'New Component' : p, description: 'AI Generated component' }
      }],
      edges: targetParent ? [{
        id: `e-${targetParent}-${newNodeId}`,
        source: targetParent,
        target: newNodeId,
        animated: true,
        style: { stroke: 'var(--primary)', strokeWidth: 2 }
      }] : [],
      message: `Analyzing requirement... Added "${p}" to the existing architecture flow.`
    };
  }
};
