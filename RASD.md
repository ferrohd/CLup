![Logo Politecnico di Milano](assets/polimi_logo.jpg "Politecnico di Milano")
# Requirements Analysis and Specification Document
## Authors:
- [Alessandro Ferrara](https://github.com/ferrohd)
- [Lorenzo Fratus](https://github.com/lorenzofratus)

#### Version: 0.0.5
#### Date: 25/11/2020
#### Professor: Elisabetta Di Nitto
<br>

## 1. Introduction

### A. Purpose

This document focuses on Requirements Analysis and Specification Document (RASD) and contains the description of the main goals, the domain and its representation through some models, the analysis of the scenario with the uses cases that describe them, the list of the most important requirements and specifications that characterize the development of the software described below.

It also includes the research about the interfaces, functional and non-functional requirements and the attributes that distinguish the quality of the system.

Finally, to understand better the development of the document, it contains the history that describes how it is made, with the references used and the description of its structure.

This document has the purpose to guide the developer in the realization of the software called Customers Line-up.

### B. Scope
TODO
SHARED PHENOMENA?

#### B.1. Description of the given problem

The software wants to give users the possibility to have a safer shopping experience in supermarkets avoiding crowdings inside and outside the stores.
Customers Line-up offers two main functionalities:

- **Basic service**: the customers can “line up” from their home, and then wait until their turn is coming to approach the store. In addition, the application can be used to generate QR codes that are scanned upon entering the store, thus allowing store managers to monitor entrances.

- **Advanced function 1**: the customers are able to book a visit at the store selecting one or more consecutive time slots. In this way they are able to completely avoid the waiting time at the entrance of the store.

Clearly, for the application to effectively work in practice, all customers should use it to access the store, and this implies that:

- The software should be very simple to use to adapt to a wide range of users, therefore it must include all demographics.

- The system should provide customers with a reasonably precise estimation of the waiting time and should be able to manage situations where a customer approaches the store with an accettable delay.

- The stores should still use fallback options for those people who do not have access to the required tecnology, for example handing out physical tickets on the spot.

#### B.2. Current system

The developements of Customers Line-up was necessary to enforce crowd-avoiding rules imposed by the coronavirus emergency, for this reason there is no current system to integrate with and to consider in our design process.

#### B.3. Goals

| GX | Description of the goal                                                                 |
|:---|:----------------------------------------------------------------------------------------|
| G1 | Allow a Visitor to become registered User after providing credentials.                  |
| G2 | Allow a Store Manager to add a Store to the system after providing credentials.         |
| G3 | Allow a User to find locations of accessible Stores.                                    |
| G4 | Allow a User to request a digital ticket to enter a specific Store as soon as possible. |
| G5 | Allow a User to request a digital ticket to enter a specific Store at a chosen time.    |
| G6 | Allow a User to delete a previously requested digital ticket before the inspection.     |
| G7 | Allow a Store Manager to issue a physical ticket.                                       |
| G8 | Allow a Store Manager to inspect a ticket at the entrance.                              |
| G9 | Allow a Store Manager to inspect a ticket at the exit.                                  |
<br>

### C. Definitions, acronyms and abbreviations

#### C.1. Definitions

- **Customer**: person that wants to visit a store, can be a registered User.
- **Ticket**: identifies the Customer and guarantees him the access to the Store.         
- **Digital ticket**: ticket requested by a User, stored on own device.         
- **Physical ticket**: ticket issued by a Store Manager in printed form.
- **Booking/Reservation**: digital ticket owned by a User to enter a store for one or more specific time slots.
- **Ticket inspection**: action of checking the validity of the ticket.
- **Store**: physical buisiness that makes use of CLup.
- **Store capacity**: maximum number of Customers allowed inside a store, currently corresponds to half of the capacity of the building.
- **Queue**: imaginary list of Customers, bound to a store, ordered by their ticket time of issue, it does not contain Users with a reservation.
- **Time Slot**: a half-hour time window.

#### C.2. Acronyms

- **RASD**: Rquirements Analysis and Specification Document.
- **API**: Application Programming Languages.
- **GPS**: Global Positioning System.

#### C.3. Abbreviations

- **CLup**: Client Line-up.
- **Gx**: Goal number x.
- **Dx**: Domain assumption number x.
- **Rx**: Functional requirement number x.

### D. Revision history

| Version | Date        | Description                          |
|:--------|:------------|:-------------------------------------|
| 1.0     | XX Nov 2020 | First version                        |

### E. Reference documents
TODO

### F. Document structure

- [Requirements Analysis and Specification Document](#requirements-analysis-and-specification-document)
  - [Authors:](#authors)
      - [Version: 0.0.5](#version-005)
      - [Date: 25/11/2020](#date-25112020)
      - [Professor: Elisabetta Di Nitto](#professor-elisabetta-di-nitto)
  - [1. Introduction](#1-introduction)
    - [A. Purpose](#a-purpose)
    - [B. Scope](#b-scope)
      - [B.1. Description of the given problem](#b1-description-of-the-given-problem)
      - [B.2. Current system](#b2-current-system)
      - [B.3. Goals](#b3-goals)
    - [C. Definitions, acronyms and abbreviations](#c-definitions-acronyms-and-abbreviations)
      - [C.1. Definitions](#c1-definitions)
      - [C.2. Acronyms](#c2-acronyms)
      - [C.3. Abbreviations](#c3-abbreviations)
    - [D. Revision history](#d-revision-history)
    - [E. Reference documents](#e-reference-documents)
    - [F. Document structure](#f-document-structure)
  - [2 Overall description](#2-overall-description)
    - [A. Product perspective](#a-product-perspective)
    - [B. Product functions](#b-product-functions)
      - [B.1. Digital line-up](#b1-digital-line-up)
      - [B.2 Physical line-up](#b2-physical-line-up)
      - [B.3. Book a visit](#b3-book-a-visit)
      - [B.4. Ticket inspection](#b4-ticket-inspection)
    - [C. User characteristics](#c-user-characteristics)
    - [D. Assumptions, dependecies and constraints](#d-assumptions-dependecies-and-constraints)
      - [D.1. Text assumptions](#d1-text-assumptions)
      - [D.2. Domain assumptions](#d2-domain-assumptions)
      - [D.3. Dependencies](#d3-dependencies)
      - [D.4. Constraints](#d4-constraints)
  - [3. Secific requirements](#3-secific-requirements)
    - [A. External interface requirements](#a-external-interface-requirements)
      - [A.1. User interfaces](#a1-user-interfaces)
      - [A.2. Hardware interfaces](#a2-hardware-interfaces)
      - [A.3. Software interfaces](#a3-software-interfaces)
      - [A.4. Communication interfaces](#a4-communication-interfaces)
    - [B. Functional rquirements](#b-functional-rquirements)
      - [B.1. Allow a Visitor to become registered User.](#b1-allow-a-visitor-to-become-registered-user)
      - [B.2. Allow a Store Manager to add a store to the system.](#b2-allow-a-store-manager-to-add-a-store-to-the-system)
      - [B.3. Allow a User to find locations of accessible stores.](#b3-allow-a-user-to-find-locations-of-accessible-stores)
      - [B.4. Allow a User to request a digital ticket to enter a specific store as soon as possible.](#b4-allow-a-user-to-request-a-digital-ticket-to-enter-a-specific-store-as-soon-as-possible)
      - [B.5. Allow a User to request a digital ticket to enter a specific store at a chosen time.](#b5-allow-a-user-to-request-a-digital-ticket-to-enter-a-specific-store-at-a-chosen-time)
      - [B.6. Allow a User to delete a previously requested digital ticket before the inspection.](#b6-allow-a-user-to-delete-a-previously-requested-digital-ticket-before-the-inspection)
      - [B.7. Allow a Store Manager to issue a physical ticket.](#b7-allow-a-store-manager-to-issue-a-physical-ticket)
      - [B.8. Allow a Store Manager to inspect a ticket at the entrance.](#b8-allow-a-store-manager-to-inspect-a-ticket-at-the-entrance)
      - [B.9. Allow a Store Manager to inspect a ticket at the exit.](#b9-allow-a-store-manager-to-inspect-a-ticket-at-the-exit)
    - [C. Performance requirements](#c-performance-requirements)
    - [D. Design constraints](#d-design-constraints)
      - [D.1. Standards compliance](#d1-standards-compliance)
      - [D.2. Hardware limitations](#d2-hardware-limitations)
      - [D.3. Any other constraint](#d3-any-other-constraint)
    - [E. Software System Attributes](#e-software-system-attributes)
      - [E.1. Reliability and avaiability](#e1-reliability-and-avaiability)
      - [E.2. Security](#e2-security)
      - [E.3. Maintainability](#e3-maintainability)
    - [E.4. Portability](#e4-portability)
  - [4. Formal analysis using alloy](#4-formal-analysis-using-alloy)
  - [5. Effort spent](#5-effort-spent)
    - [Ferrara Alessandro](#ferrara-alessandro)
    - [Fratus Lorenzo](#fratus-lorenzo)
  - [6. References](#6-references)

## 2 Overall description

### A. Product perspective
TODO
SCENARIOS
FURTHER DETAILS ON SHARED PHENOMENA
CLASS DIAGRAMS
STATECHARTS

### B. Product functions

#### B.1. Digital line-up

This is the basic function of this system that allows the User to line-up for the desired store using any device. Once the request is received, a digital ticket is issued and the User is added to the store queue. While waiting for his turn, the User is able to see the number of Customers before him and an estimation of the waiting time.
At any time the User can leave the queue for a store, this results in the deletion of his ticket.

#### B.2 Physical line-up

This function is almost identycal to the "Digital Line-up". In fact, the Physical Line-up allows the Customers who don't have access to the required techonolgy to queue up. For those who can't acquire a digital ticket there is the possibility to request a physical one at the Store Manager granting them to queue-up among the other Customers.

#### B.3. Book a visit

Unlike the previous functions, the User is able to book a visit to the store, avoiding the queue.
After selecting the time slot he prefers, he is able to plan the visit to help the system manage the total number of Customers in the Store. As in the "Digital Line-up" function the user is provided a digital ticket that can be deleted at anytime, therefore canceling the booking.

#### B.4. Ticket inspection

This function is reserved to Store Managers and cannot be used by Users.
The Store Manager will inspect a ticket before letting a Customer in and out the store. This allows him to check that the ticket is valid and to manage the number of Customers currently in the store.

### C. User characteristics

- **Visitor**: person using CLup that is not yet registered to the system. 
- **Registered User/User**: person registered to the CLup system, his main objective is enter a store to buy groceries while avoiding the risk of crowdings.
- **Store Manager**: person working for a store (at any level of hierarchy), his main objective are to manage the flow of Customers inside the building and to offer them a safe shopping experience.

### D. Assumptions, dependecies and constraints

In order to better clarify the presentation and avoid any ambiguities we decided to introduce the following assumptions.

#### D.1. Text assumptions

- Credentials that a Visitor has to provide to become a registered User are: name, surname, address, email and password.
- Credentials that a Store Manager has to provide to add a store to the system are: store name, name and surname of the owner, address, VAT number, email and password.
- Credentials that a registered User or a Store Manager have to provide to login are: email and password (in case of the Store Manager those associated with his store).
- The Store Manager can modify the store capacity according to the regulations in force.
- A store is accessible if the number of Customers inside does not exceed the store capacity.
- A store is accessible only during the opening time.
- A User can be present at most in one queue at any time (for any store).
- A User can book as many consecutive time slots as he wants in the same store.
- A User cannot have reservations in multiple stores during the same time slots.
- A User cannot be in a queue during any of the booked time slot (if present).
- A Customer can enter a store only when it is accessible.
- When a Customer's turn in the queue arrives, he has to enter the store in the short term.
- A User with a reservation can enter the store at any time during the booked time slots.
- Before entering and leaving the Store the Customer's ticket is inspected by the Store Manager.
- When a Customer enters a Store he is no longer in the queue.
- A User with a reservation have to exit the store before the end of his last time slot.

#### D.2. Domain assumptions

| DX  | Description of the domain assumption                                                        |
|:----|:--------------------------------------------------------------------------------------------|
| D1  | The provided email during the registration is valid and unique.                             |
| D2  | The information provided by the Store Manager are always correct.                           |
| D3  | Users and stores locations are retreived by GPS.                                            |
| D4  | The GPS positions are always correct.                                                       |
| D5  | The queue is never full.                                                                    |
| D6  | The number of bookings in a time slot cannot exceed three-quarters of the store capacity.   |
| D7  | When a ticket is inspected at the entrance of a store, its remaining capacity is decreased. |
| D8  | When a ticket is inspected at the exit of a store, its remaining capacity is increased.     |
| D9  | A User with a valid reservation always takes precedence over Customers in the queue.        |
| D10 | When a User deletes a reservation, the acquired time slots are released.                    |
<br>

#### D.3. Dependencies
TODO

#### D.4. Constraints
TODO

## 3. Secific requirements

### A. External interface requirements

#### A.1. User interfaces

The following mockups represent a basic idea of what the mobile app will look like in the first release.

TODO
MOCKUP REGISTRATION
MOCKUP LOGIN
MOCKUP SELECT A STORE
MOCKUP QUEUE UP AND BOOK A VISIT
MOCKUP SCAN A TICKET
MOCKUP ADD A STORE

#### A.2. Hardware interfaces

The system requires each registered User (or Visitor) to have at least one mobile device (such as a smartphone or tablet) that will be used to exibit the ticket to the Store Manager.

The User can perform the operations to request the ticket also from a PC of any kind that will not be sufficient to have access to the store.

The Store Manager needs a mobile device or a PC equipped with a camera to scan the tickets and a printer of any kind to hand out tickets to Customers that do not use CLup.

#### A.3. Software interfaces

The CLup applicative is a web application, for this reason a relatively modern web browser is sufficient in order to render the application.

#### A.4. Communication interfaces

To perform any operation in the application, an Internet connection (WiFi or mobile) is required.

When the User has queued-up or has booked for a visit, can interrupt the connection without losing the place in the queue or the booking.

A Store Manager always needs a stable internet connection in order to manage the flow of Customers.

### B. Functional rquirements
TODO
USE CASES
USE CASE DIAGRAMS
SEQUENCE/ACTIVITY DIAGRAMS

#### B.1. Allow a Visitor to become registered User.

| G1  | Allow a Visitor to become registered User after providing credentials.                     |
|:----|:-------------------------------------------------------------------------------------------|
| R1  | A Visitor must be able to begin the registration process. During the process the system will ask him to provide credentials. |
| D1  | The provided email during the registration is valid and unique.                            |
<br>

#### B.2. Allow a Store Manager to add a store to the system.

| G2  | Allow a Store Manager to add a store to the system after providing credentials.            |
|:----|:-------------------------------------------------------------------------------------------|
| R2  | A Store Manager must be able to begin the registration process. During the process the system will ask him to provide credentials. |
| D1  | The provided email during the registration is valid and unique.                            |
| D2  | The information provided by the Store Manager are always correct.                          |
<br>

#### B.3. Allow a User to find locations of accessible stores.

| G3  | Allow a User to find locations of accessible stores.                                       |
|:----|:-------------------------------------------------------------------------------------------|
| R3  | A registered User must be able to login to the system using his credentials.               |
| R4  | The system must be able to provide the list of accessible stores within a certain area, encoded as the coordinates of an origin point and the maximum distance from it, from the current position of a User. |
| R5  | The system must be able to provide the list of accessible stores within a certain area, encoded as the coordinates of an origin point and the maximum distance from it, from an address specified by a User. |
| D3  | Users and stores locations are retreived by GPS.                                           |
| D4  | The GPS positions are always correct.                                                      | 
<br>

#### B.4. Allow a User to request a digital ticket to enter a specific store as soon as possible.

| G4  | Allow a User to request a digital ticket to enter a specific store as soon as possible.    |
|:----|:-------------------------------------------------------------------------------------------|
| R3  | A registered User must be able to login to the system using his credentials.               |
| R6  | The system must be able to permit a User to line-up for an accessible store.               |
| R7  | The system must be able to issue a digital ticket to a User if the process is successful.  |
| D5  | The queue is never full.                                                                   |
<br> 

#### B.5. Allow a User to request a digital ticket to enter a specific store at a chosen time.

| G5  | Allow a User to request a digital ticket to enter a specific store at a chosen time.       |
|:----|:-------------------------------------------------------------------------------------------|
| R3  | A registered User must be able to login to the system using his credentials.               |
| R7  | The system must be able to issue a digital ticket to a User if the process is successful.  |
| R8  | The system must be able to permit a User to book a visit for an accessible Store.          |
| D6  | The number of bookings in a time slot cannot exceed three-quarters of the store capacity.  |
<br>

#### B.6. Allow a User to delete a previously requested digital ticket before the inspection.

| G6  | Allow a User to delete a previously requested digital ticket before the inspection.        |
|:----|:-------------------------------------------------------------------------------------------|
| R3  | A registered User must be able to login to the system using his credentials.               |
| D6  | The number of bookings in a time slot cannot exceed three-quarters of the store capacity.  |
| D10 | When a User deletes a reservation, the acquired time slots are released.                   |
<br>

#### B.7. Allow a Store Manager to issue a physical ticket.

| G7  | Allow a Store Manager to issue a physical ticket.                                          |
|:----|:-------------------------------------------------------------------------------------------|
| R9  | A Store Manager must be able to login to the system using the store credentials.           |
| R10 | A Store Manager must be able to add to the queue a Customer that's not registered to CLup. |
| R11 | A Store Manager must be able to physically print a ticket.                                 |
| D5  | The queue is never full.                                                                   |
<br>

#### B.8. Allow a Store Manager to inspect a ticket at the entrance.

| G8  | Allow a Store Manager to inspect a ticket at the entrance.                                 |
|:----|:-------------------------------------------------------------------------------------------|
| R9  | A Store Manager must be able to login to the system using the Store credentials.           |
| R12 | A Store Manager must be able to validate a scanned ticket.                                 |
| R13 | A Store Manager must be able to see the remaining capacity of the store.                   |
| D7  | When a ticket is inspected at the entrance of a store, its remaining capacity is decreased.|
| D9  | A User with a valid reservation always takes precedence over Customers in the queue.       |
<br>

#### B.9. Allow a Store Manager to inspect a ticket at the exit.

| G9  | Allow a Store Manager to inspect a ticket at the exit.                                     |
|:----|:-------------------------------------------------------------------------------------------|
| R9  | A Store Manager must be able to login to the system using the store credentials.           |
| R12 | A Store Manager must be able to validate a scanned ticket.                                 |
| D8  | When a ticket is inspected at the exit of a store, its remaining capacity is increased.    |
<br>

### C. Performance requirements

The system must be able to handle a great number of concurrent requests especially during peak times (typically lunch and dinner). We are planning to launch this service in Milan (1.35 million people), so we can estimate, in the first year, approximately 750.000 Users with a maximum of 125.000 simultaneous connections.

### D. Design constraints

#### D.1. Standards compliance

The code should follow the requirements contained in this document. Minor deviations are permitted but not advised.

#### D.2. Hardware limitations

The first implementation of CLup will include only a web application available for any modern browser able to retreive User's location. The Store Manager's device must be equipped with a camera to be able to scan the tickets. The Store must be provided with a printer to print tickets, allowing the physical line-up.

#### D.3. Any other constraint

In the first release no public interfaces will be opened and third party services won’t be able to interoperate with CLup.

### E. Software System Attributes

#### E.1. Reliability and avaiability

The estimated waiting time in the queue should be as close as possible to the ideal one. The count of reservations for every time slot must be correct to avoid overbooking with the effect of letting people wait outside the store or letting them inside violating the capacity limit.
The presence of CLup in the everyday life enforces security rules aimed to prevent the spreading of the pandemic. In any case a limited period of downtime is admissible outside of the most common opening time of the stores. A 95% uptime is plausible so the MTTR must be contained in ~18 days.
In order to comply the required uptime the system must be supported by an appropriate infrastructure composed of redundant services.

#### E.2. Security

The CLup application is not involved in any payment process, so no critical information is stored nor used. Regarding the data that the User provides (e.g. GPS location, personal or contact information), none of those will be used for purposes outside the CLup scope.
Common security standards should be implemented in the management and storage of Users data.

#### E.3. Maintainability

The system must be written in a widely used programming language and must ensure a high level of maintainability.
Code must be written following standards with high level of abstractions without hard-code as well and must be highly commented in any aspect. 
Code must provide testing routine that covers at least 70% of the entire code, excluding software interface.
The system has also to be built considering a future expansion, guaranteeing an high level of scalability both on the number of store and the available cities.

### E.4. Portability

The software must be available from the vast majority of the devices to meet the need of having a wide spread application. To do so the system must be independent from the operating system of the single device.

## 4. Formal analysis using alloy
TODO

## 5. Effort spent

### Ferrara Alessandro
### Fratus Lorenzo

| Topic                                                            |      Hours |
|:-----------------------------------------------------------------|-----------:|
| Discussion on the first part                                     |       1.5h |
| First and second part                                            |       2.5h |
| Second and third part                                            |       2.5h |
| Domain assumption, functional requirements and mapping           |       2.0h |
| Structure adaptation, edit on previous parts, more on third part |       2.5h |
<br>

## 6. References

- Software Engineering II course slides
- [Decreto Ministeriale](https://www.gazzettaufficiale.it/atto/vediPermalink?atto.dataPubblicazioneGazzetta=2020-11-09&atto.codiceRedazionale=20G00170&tipoSerie=serie_generale&tipoVigenza=originario&tipoProvvedimento=*)