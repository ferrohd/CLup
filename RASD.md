![Logo Politecnico di Milano](assets/polimi_logo.jpg "Politecnico di Milano")
# Requirements Analysis and Specification Document
## Authors:
- [Alessandro Ferrara](https://github.com/ferrohd)
- [Lorenzo Fratus](https://github.com/lorenzofratus)

#### Version: 0.0.2
#### Date: 18/11/2020
#### Professor: Elisabetta Di Nitto
<br>

## Table of Contents
- [Requirements Analysis and Specification Document](#requirements-analysis-and-specification-document)
  - [Authors:](#authors)
      - [Version: 0.0.2](#version-002)
      - [Date: 18/11/2020](#date-18112020)
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

|    |                                                                                         |
|:---|:----------------------------------------------------------------------------------------|
| G1 | Allow a Visitor to become registered User after providing credentials.                  |
| G2 | Allow a User to find locations of available stores.                                     |
| G3 | Allow a User to request a digital ticket to enter a specific store as soon as possible. |
| G4 | Allow a User to request a digital ticket to enter a specific store at a chosen time.    |
| G5 | Allow a User to provide advanced details about the visit when requesting a ticket.      |
| G6 | Allow a User to reach the store at the time he has requested a ticket for.              |
| G7 | Allow a Store Manager to issue a physical ticket.                                       |
| G8 | Allow a Store Manager to inspect a ticket.                                              |

### 1.3. Definitions, acronyms and abbreviations

#### 1.3.1. Definitions

- Customer: person that wants to visit a store, can be a registered User.
- Ticket: identifies the Customer and guarantees him the access to the store.         
- Digital ticket: Ticket requested by a User, stored on own device.         
- Physical ticket: Ticket issued by a Store Manager in printed form.
- Device
- Queue


### 1.3.2. Acronyms

- RASD: Rquirements Analysis and Specification Document.
- API: Application Programming Languages.
- BDSM: Bible Discussion Study Meeting

### 1.3.3. Abbreviations

- CLup: Client Line-up.
- Gx: Goal number x.
- Dx: Domain assumption number x.
- Rx: Functional requirement number x.

## 2 Overall Description

### 2.1. Product Perspective
BOH

### 2.2. Product Functions

#### 2.2.1. Digital Line-up 
This is the basic function of this system that allows the User to line-up for the desired store using own device. Once the request is received, a digital ticket is issued and the User is listed into a virtual queue for that store. The user is notified when it is his turn to enter the store.

#### 2.2.2 Physical Line-up
This function is almost identycal to the "Digital Line-up". In fact, the Physical Line-up allows the Customers who don't have access to the required techonolgy to queue up. For those who can't acquire a digital ticket there is the possibility to request a physical one at the Store Manager
granting them to queue-up among the other Customers.

#### 2.2.3. Book a Visit
Unlike the previous functions, the User is able to book a visit to the store, avoiding the queue.
After selecting the time slot he prefers, he is able to plan the visit (providing details about the items that wants to purchase) to help the system manage the total number of Customers in the store. As in the "Digital Line-up" function the user is provided a digital ticket.

#### 2.2.4. Ticket Inspection
This function is reserved to Store Managers and cannot be used by Users.
The Store Manager will inspect a ticket before letting a Customer into the store. This allows him to check that the ticket is valid and to manage the number of Customers currently in the store.

### 2.3. User Characteristics

- Visitor: person using CLup without being registered, the only action he can perfom is register to the application.
- Registered User/User: person successfully registered to the CLup application now able to use all the services reserved for Users.
- Store Manager: profile associated with the store with access to the management functionalities of the system.

### 2.4. Costraints

## 5. Effort Spent

### Ferrara Alessandro
| Topic                                   |      Hours |
|:----------------------------------------|-----------:|
| Discussion on the first part            |       1.5h |
| Discussion on the first and second part |       2.5h |
<br>

### Fratus Lorenzo
| Topic                                   |      Hours |
|:----------------------------------------|-----------:|
| Discussion on the first part            |       1.5h |
| Discussion on the first and second part |       2.5h |
<br>

## 6. References
- Slides