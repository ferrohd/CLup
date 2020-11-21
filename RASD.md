![Logo Politecnico di Milano](assets/polimi_logo.jpg "Politecnico di Milano")
# Requirements Analysis and Specification Document
## Authors:
- [Alessandro Ferrara](https://github.com/ferrohd)
- [Lorenzo Fratus](https://github.com/lorenzofratus)

#### Version: 0.0.3
#### Date: 21/11/2020
#### Professor: Elisabetta Di Nitto
<br>

## Table of Contents
- [Requirements Analysis and Specification Document](#requirements-analysis-and-specification-document)
  - [Authors:](#authors)
      - [Version: 0.0.3](#version-003)
      - [Date: 21/11/2020](#date-21112020)
      - [Professor: Elisabetta Di Nitto](#professor-elisabetta-di-nitto)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
    - [1.1. Purpose](#11-purpose)
    - [1.2. Scope](#12-scope)
      - [1.2.1. Description of the Given Problem](#121-description-of-the-given-problem)
      - [1.2.2. Current System](#122-current-system)
      - [1.2.3. Goals](#123-goals)
    - [1.3. Definitions, acronyms and abbreviations](#13-definitions-acronyms-and-abbreviations)
      - [1.3.1. Definitions](#131-definitions)
    - [1.3.2. Acronyms](#132-acronyms)
    - [1.3.3. Abbreviations](#133-abbreviations)
  - [2 Overall Description](#2-overall-description)
    - [2.1. Product Perspective](#21-product-perspective)
    - [2.2. Product Functions](#22-product-functions)
      - [2.2.1. Digital Line-up](#221-digital-line-up)
      - [2.2.2 Physical Line-up](#222-physical-line-up)
      - [2.2.3. Book a Visit](#223-book-a-visit)
      - [2.2.4. Ticket Inspection](#224-ticket-inspection)
    - [2.3. User Characteristics](#23-user-characteristics)
    - [2.4. Costraints](#24-costraints)
      - [2.4.1. Regulatory Policies](#241-regulatory-policies)
      - [2.4.2. Hardware Limitations](#242-hardware-limitations)
      - [2.4.3. Interfaces to other applications](#243-interfaces-to-other-applications)
    - [2.5. Assumptions and dependecies](#25-assumptions-and-dependecies)
      - [2.5.1. Text Assumptions](#251-text-assumptions)
      - [2.5.2. Domain Assumptions](#252-domain-assumptions)
  - [3. Secific Requirements](#3-secific-requirements)
    - [3.1. External interface requirements](#31-external-interface-requirements)
      - [3.1.1. User interfaces](#311-user-interfaces)
    - [3.2. Functional Rquirements](#32-functional-rquirements)
      - [3.2.1. Allow a Visitor to become registered User.](#321-allow-a-visitor-to-become-registered-user)
      - [3.2.2. Allow a Store Manager to add a Store to the system.](#322-allow-a-store-manager-to-add-a-store-to-the-system)
      - [3.2.3. Allow a User to find locations of accessible Stores.](#323-allow-a-user-to-find-locations-of-accessible-stores)
      - [3.2.4. Allow a User to request a digital ticket to enter a specific Store as soon as possible.](#324-allow-a-user-to-request-a-digital-ticket-to-enter-a-specific-store-as-soon-as-possible)
      - [3.2.5. Allow a User to request a digital ticket to enter a specific Store at a chosen time.](#325-allow-a-user-to-request-a-digital-ticket-to-enter-a-specific-store-at-a-chosen-time)
  - [5. Effort Spent](#5-effort-spent)
    - [Ferrara Alessandro](#ferrara-alessandro)
    - [Fratus Lorenzo](#fratus-lorenzo)
  - [6. References](#6-references)

## 1. Introduction
### 1.1. Purpose

This document focuses on Requirements Analysis and Specification Document (RASD) and contains the description of the main goals, the domain and its representation through some models, the analysis of the scenario with the uses cases that describe them, the list of the most important requirements and specifications that characterize the development of the software described below.

It also includes the research about the interfaces, functional and non-functional requirements and the attributes that distinguish the quality of the system.

Finally, to understand better the development of the document, it contains the history that describes how it is made, with the references used and the description of its structure.

This document has the purpose to guide the developer in the realization of the software called Customers Line-up.

### 1.2. Scope

#### 1.2.1. Description of the Given Problem

The software wants to give users the possibility to have a safer shopping experience in supermarkets avoiding crowdings inside and outside the stores.
Customers Line-up offers two main functionalities:

- **Basic service**: the customers can “line up” from their home, and then wait until their turn is coming to approach the store. In addition, the application can be used to generate QR codes that are scanned upon entering the store, thus allowing store managers to monitor entrances.

- **Advanced function 1**: the customers are able to book a visit at the store indicating the expected duration of the visit and allowing them to define a list of items they intend to purchase (or at least their respective categories) in order to estimante the location of each person in the store, thus allowing more customers to enter at the same time.

Clearly, for the application to effectively work in practice, all customers should use it to access the store, and this implies that:

- The software should be very simple to use to adapt to a wide range of users, therefore it must include all demographics.

- The system should provide customers with a reasonably precise estimation of the waiting time and should alert them taking into account the time they need to get to the shop from the place they currently are (to avoid situations where a customer approaches the store too late/early).

- The stores should still use fallback options for those people who do not have access to the required tecnology, for example handing out "queue tickets" on the spot.

#### 1.2.2. Current System

The developements of Customers Line-up was necessary to enforce crowd-avoiding rules imposed by the coronavirus emergency, for this reason there is no current system to integrate with and to consider in our design process.

#### 1.2.3. Goals

|     |                                                                                         |
|:----|:----------------------------------------------------------------------------------------|
| G1  | Allow a Visitor to become registered User after providing credentials.                  |
| G2  | Allow a Store Manager to add a Store to the system after providing credentials.         |
| G3  | Allow a User to find locations of accessible Stores.                                    |
| G4  | Allow a User to request a digital ticket to enter a specific Store as soon as possible. |
| G5  | Allow a User to request a digital ticket to enter a specific Store at a chosen time.    |
| G6  | Allow a User to provide advanced details about the visit when requesting a ticket.      |
| G7  | Allow a User to enter the Store at the time he has requested a ticket for.              |
| G8  | Allow a Store Manager to issue a physical ticket.                                       |
| G9  | Allow a Store Manager to inspect a ticket.                                              |
| G10 | Allow a Store Manager to manually end a Customer's visit.                               |

### 1.3. Definitions, acronyms and abbreviations

#### 1.3.1. Definitions

- Customer: person that wants to visit a Store, can be a registered User.
- Ticket: identifies the Customer and guarantees him the access to the Store.         
- Digital ticket: Ticket requested by a User, stored on own device.         
- Physical ticket: Ticket issued by a Store Manager in printed form.
- Store: physical buisiness that makes use of CLup.
- Device
- Queue


### 1.3.2. Acronyms

- RASD: Rquirements Analysis and Specification Document.
- API: Application Programming Languages.
- GPS: Global Positioning System.

### 1.3.3. Abbreviations

- CLup: Client Line-up.
- Gx: Goal number x.
- Dx: Domain assumption number x.
- Rx: Functional requirement number x.

## 2 Overall Description

### 2.1. Product Perspective
TODO

### 2.2. Product Functions

#### 2.2.1. Digital Line-up

This is the basic function of this system that allows the User to line-up for the desired Store using own device. Once the request is received, a digital ticket is issued and the User is listed into a virtual queue for that Store. The user is notified when it is his turn to enter the Store.

#### 2.2.2 Physical Line-up

This function is almost identycal to the "Digital Line-up". In fact, the Physical Line-up allows the Customers who don't have access to the required techonolgy to queue up. For those who can't acquire a digital ticket there is the possibility to request a physical one at the Store Manager
granting them to queue-up among the other Customers.

#### 2.2.3. Book a Visit

Unlike the previous functions, the User is able to book a visit to the Store, avoiding the queue.
After selecting the time slot he prefers, he is able to plan the visit (providing details about the items that wants to purchase) to help the system manage the total number of Customers in the Store. As in the "Digital Line-up" function the user is provided a digital ticket.

#### 2.2.4. Ticket Inspection

This function is reserved to Store Managers and cannot be used by Users.
The Store Manager will inspect a ticket before letting a Customer into the Store. This allows him to check that the ticket is valid and to manage the number of Customers currently in the Store.

### 2.3. User Characteristics

- Visitor: person using CLup without being registered, the only action he can perfom is register to the application.
- Registered User/User: person successfully registered to the CLup application now able to use all the services reserved for Users.
- Store Manager: profile associated with the Store with access to the management functionalities of the system.

### 2.4. Costraints

#### 2.4.1. Regulatory Policies

The system will have to ask for users' permission in order to retrieve and use their positions without (at least in a first implementation) storing them. Their data, including email addresses won't be used for commercial uses.

#### 2.4.2. Hardware Limitations

The first implementation of CLup will include only a Web App available for any modern browser able to retreive user's location. The Store Manager's device must be equipped with a camera to be able to scan the tickets. The Store must be provided with a printer to print tickets, allowing the physical line-up.

#### 2.4.3. Interfaces to other applications

In the first release no public interfaces will be opened and third party services won’t be able to interoperate with CLup.


### 2.5. Assumptions and dependecies

In order to better clarify the presentation and avoid any ambiguities we decided to introduce the following assumptions.

#### 2.5.1. Text Assumptions

- Credentials that a Visitor has to provide to become a registered User are: name, surname, address, email and password.
- Credentials that a Store Manager has to provide to add a Store to the system are: store name, name and surname of the owner, address, VAT number, email and password.
- In order to access to the system a Store Manager has to provide the email and password associated to the Store.
- The Store Manager can modify the capacity of the Store according to the regulations in force.
- A Store is accessible if the number of Customers inside does not exceed half the capacity of the building.
- A Store is accessible only during the opening time.
- A User cannot be present more than once in a queue at the same time.
- A Customer can enter a Store only when it is accessible.
- Before entering the Store the Customer's ticket is checked by the Store Manager.
- When a Customer enters a Store he is no longer in the queue.
- If a Customer does not notify the system, the Store Manager has to end his visit manually.

#### 2.5.2. Domain Assumptions

|    |                                                                                 |
|:---|:--------------------------------------------------------------------------------|
| D1 | The provided email during the registration is valid and unique.                 |
| D2 | The information provided by the Store Manager are always correct.               |
| D3 | Users and Stores locations are retreived by GPS.                                |
| D4 | The GPS positions are always correct.                                           |
| D5 | The queue is never full.                                                        |
| D6 | The number of bookings in a time frame cannot exceed the maximum capacity of the store.  |
| D7 | When a Customer with no reservation enters a Store, the remaining capacity is decreased. |
| D8 | From the starting time of a reservation to a Store, the remaining capacity is decreased. |
| D9 | When a Customer's visit ends, the remaining capacity is increased.              |

## 3. Secific Requirements
### 3.1. External interface requirements
#### 3.1.1. User interfaces

The following mockups represent a basic idea of what the mobile app will look like in the first release.

MOCKUP REGISTRATION
MOCKUP LOGIN
MOCKUP SELECT A STORE
MOCKUP QUEUE UP AND BOOK A VISIT
MOCKUP SCAN A TICKET
MOCKUP ADD A STORE

### 3.2. Functional Rquirements

#### 3.2.1. Allow a Visitor to become registered User.

| G1  | Allow a Visitor to become registered User after providing credentials.                  |
|:----|:----------------------------------------------------------------------------------------|
| R1  | A Visitor must be able to begin the registration process. During the process the system will ask him to provide credentials.                                                                            |
| D1  | The provided email during the registration is valid and unique.                         |

#### 3.2.2. Allow a Store Manager to add a Store to the system.

| G2  | Allow a Store Manager to add a Store to the system after providing credentials.         |
|:----|:----------------------------------------------------------------------------------------|
| R2  | A Store Manager must be able to begin the registration process. During the process the system will ask him to provide credentials.                                                                         |
| D1  | The provided email during the registration is valid and unique.                         |
| D2  | The information provided by the Store Manager are always correct.                       |

#### 3.2.3. Allow a User to find locations of accessible Stores.

| G3  | Allow a User to find locations of accessible Stores.                                    |
|:----|:----------------------------------------------------------------------------------------|
| R3  | A registered User must be able to login to the system using his credentials.            |
| R4  | The system must be able to provide the list of accessible Stores within a certain area,
encoded as the coordinates of an origin point and the maximum distance from it, from the
current position of a User.                                                                     |
| R5  | The system must be able to provide the list of accessible Stores within a certain area,
encoded as the coordinates of an origin point and the maximum distance from it, from an address specified by a User.                                                                                           |
| D3  | Users and Stores locations are retreived by GPS.                                        |
| D4  | The GPS positions are always correct.                                                   | 

#### 3.2.4. Allow a User to request a digital ticket to enter a specific Store as soon as possible.

| G4  | Allow a User to request a digital ticket to enter a specific Store as soon as possible. |
|:----|:----------------------------------------------------------------------------------------|
| R3  | A registered User must be able to login to the system using his credentials.            |
| R6  | The system must be able to permit a User to line-up for an accessible Store.            |
| R7  | The system must be able to issue a digital ticket to a User if the process is successful. |
| D5  | The queue is never full.                                                                | 

#### 3.2.5. Allow a User to request a digital ticket to enter a specific Store at a chosen time.

| G5  | Allow a User to request a digital ticket to enter a specific Store at a chosen time.    |
|:----|:----------------------------------------------------------------------------------------|
| R3  | A registered User must be able to login to the system using his credentials.            |
| R7  | The system must be able to issue a digital ticket to a User if the process is successful. |
| R8  | The system must be able to permit a User to book a visit for an accessible Store.       |
| D6  | The number of bookings in a time frame cannot exceed the maximum capacity of the store. |

## 5. Effort Spent

### Ferrara Alessandro
| Topic                                   |      Hours |
|:----------------------------------------|-----------:|
| Discussion on the first part            |       1.5h |
| First and second part                   |       2.5h |
| Second and third part                   |       2.5h |
<br>

### Fratus Lorenzo
| Topic                                   |      Hours |
|:----------------------------------------|-----------:|
| Discussion on the first part            |       1.5h |
| First and second part                   |       2.5h |
| Second and third part                   |       2.5h |
<br>

## 6. References
- Slides