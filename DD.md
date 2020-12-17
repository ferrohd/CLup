![Logo Politecnico di Milano](assets/polimi_logo.jpg "Politecnico di Milano")
# Design Document <!-- omit in toc -->
## Customers Line-up <!-- omit in toc -->
### Authors: <!-- omit in toc -->
- [Alessandro Ferrara](https://github.com/ferrohd)
- [Lorenzo Fratus](https://github.com/lorenzofratus)

#### Version: 0.0.1 <!-- omit in toc -->
#### Date: 15/12/2020 <!-- omit in toc -->
#### Professor: Elisabetta Di Nitto <!-- omit in toc -->
<br>

- [1. Introduction](#1-introduction)
  - [A. Purpose](#a-purpose)
  - [B. Scope](#b-scope)
  - [C. Definitions, acronyms and abbreviations](#c-definitions-acronyms-and-abbreviations)
  - [D. Revision history](#d-revision-history)
  - [E. Reference document](#e-reference-document)
  - [F. Document structure](#f-document-structure)
- [2. Architectural design](#2-architectural-design)
  - [A. Overview](#a-overview)
    - [A.1. Physical architecture](#a1-physical-architecture)
    - [A.2. High level layers](#a2-high-level-layers)
  - [B. Component view](#b-component-view)
    - [B.1. High level component](#b1-high-level-component)
    - [B.2. Clupper Services projection](#b2-clupper-services-projection)
    - [B.3. Store Manager Services projection](#b3-store-manager-services-projection)
    - [B.4. Account Services projection](#b4-account-services-projection)
    - [B.5. ER diagram](#b5-er-diagram)
  - [C. Deployment view](#c-deployment-view)
    - [C.1. Recommended implementation](#c1-recommended-implementation)
  - [D. Runtime view](#d-runtime-view)
  - [E. Component interface](#e-component-interface)
  - [F. Selected architectural styles and patterns](#f-selected-architectural-styles-and-patterns)
  - [G. Other design decisions](#g-other-design-decisions)
- [3. User interface design](#3-user-interface-design)
  - [A. UI mockups](#a-ui-mockups)
  - [B. UX diagrams](#b-ux-diagrams)
    - [B.1. Visitor](#b1-visitor)
    - [B.2. Clupper](#b2-clupper)
    - [B.3. Store manager](#b3-store-manager)
- [4. Requirements traceability](#4-requirements-traceability)
- [5. Implementation, integration and test plan](#5-implementation-integration-and-test-plan)
- [6. Effort spent](#6-effort-spent)
  - [Pair programming](#pair-programming)
  - [Ferrara Alessandro](#ferrara-alessandro)
  - [Fratus Lorenzo](#fratus-lorenzo)
- [7. References](#7-references)

## 1. Introduction
### A. Purpose
### B. Scope
### C. Definitions, acronyms and abbreviations
### D. Revision history
### E. Reference document
### F. Document structure

## 2. Architectural design
### A. Overview
*[High level components and their interaction]*  
TODO

#### A.1. Physical architecture
![Physical architecture diagram](assets/use/../architecture_overview/physical_architecture_diagram.svg "Physical architecture diagram")

TODO

#### A.2. High level layers
![High level layers diagram](assets/use/../architecture_overview/high_level_layers.svg "High level layers diagram")

TODO

### B. Component view
TODO

#### B.1. High level component
![High level component diagram](assets/use/../components_view/high_level_component_diagram.svg "High level component diagram")
TODO

#### B.2. Clupper Services projection
![Clupper Services projection diagram](assets/use/../components_view/clupper_services_projection.svg "Clupper Services projection diagram")
TODO

#### B.3. Store Manager Services projection
![Store Manager Services projection diagram](assets/use/../components_view/store_manager_services_projection.svg "Store Manager Services projection diagram")

*[Camera, Printer external interfaces?]*  
TODO

#### B.4. Account Services projection
![Account Services projection diagram](assets/use/../components_view/account_services_projection.svg "Account Services projection diagram")
TODO

#### B.5. ER diagram
TODO

### C. Deployment view
![Deployment diagram](assets/use/../deployment_view/deployment_diagram.svg "Deployment diagram")
TODO

#### C.1. Recommended implementation
TODO

### D. Runtime view
*[Describe the way components interact to accomplish specific tasks (related to use cases)]*
TODO (SEQUENCE DIAGRAMS)

### E. Component interface
TODO (COMPONENT INTERFACE DIAGRAM)

### F. Selected architectural styles and patterns
*[Styles/patterns used, why and how]*
TODO

### G. Other design decisions
TODO (API USAGE)

## 3. User interface design
TODO (BCE DIAGRAMS?)

### A. UI mockups
TODO

### B. UX diagrams
TODO

#### B.1. Visitor
![Visitor diagram](assets/use/../ux_diagrams/ux_visitor.svg "Visitor diagram")

#### B.2. Clupper
![Clupper diagram](assets/use/../ux_diagrams/ux_clupper.svg "Clupper diagram")

#### B.3. Store manager
![Store manager diagram](assets/use/../ux_diagrams/ux_store_manager.svg "Store manager diagram")

## 4. Requirements traceability
*[How requirements (RASD) map to the design elements (DD)]*
TODO

## 5. Implementation, integration and test plan
*[Order in which we plan to implement the subcomponents and the order in which we plan to integrate them and test their integration]*
TODO

## 6. Effort spent

### Pair programming

| Topic                                                            |      Hours |
|:-----------------------------------------------------------------|-----------:|
| Architectural design diagrams                                    |       3.5h |
<br>

### Ferrara Alessandro

| Topic                                                            |      Hours |
|:-----------------------------------------------------------------|-----------:|
<br>

### Fratus Lorenzo

| Topic                                                            |      Hours |
|:-----------------------------------------------------------------|-----------:|
| UX diagrams                                                      |       2.0h |
| DD structure                                                     |       1.0h |
<br>

## 7. References