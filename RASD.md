![Logo Politecnico di Milano](assets/polimi_logo.jpg "Politecnico di Milano")
# Requirements Analysis and Specification Document
## Authors:
- [Alessandro Ferrara](https://github.com/ferrohd)
- [Lorenzo Fratus](https://github.com/lorenzofratus)

#### Version: 0.0.1
#### Date: 15/11/2020
#### Professor: Elisabetta Di Nitto
<br>

## Table of Contents
1. [Introduction](#1.-Introduction)
    1. [Purpose](#1.1.-Purpose)
    2. [Scope](#1.2.-Scope)
5. [Effort Spent](#5.-Effort-Spent)
6. [References](#6.-References)

## 1. Introduction
### 1.1. Purpose

This document focuses on Requirements Analysis and Specification Document (RASD) and contains the description of the main goals, the domain and its representation through some models, the analysis of the scenario with the uses cases that describe them, the list of the most important requirements and specifications that characterize the development of the software described below.

It also includes the research about the interfaces, functional and non-functional requirements and the attributes that distinguish the quality of the system.

Finally, to understand better the development of the document, it contains the history that describes how it is made, with the references used and the description of its structure.

This document has the purpose to guide the developer in the realization of the software called Customers Line-up.

### 1.2. Scope

The software wants to give users the possibility to have a safer shopping experience in supermarkets avoiding crowdings inside and outside the stores.
Customers Line-up offers two main functionalities:

- **Basic service**: the customers can “line up” from their home, and then wait until their turn is coming to approach the store. In addition, the application can be used to generate QR codes that are scanned upon entering the store, thus allowing store managers to monitor entrances.

- **Advanced function 1**: the customers are able to book a visit at the store indicating the expected duration of the visit and allowing them to define a list of items they intend to purchase (or at least their respective categories) in order to estimante the location of each person in the store, thus allowing more customers to enter at the same time.

Clearly, for the application to effectively work in practice, all customers should use it to access the store, and this implies that:

- The software should be very simple to use to adapt to a wide range of users, therefore it must include all demographics.

- The system should provide customers with a reasonably precise estimation of the waiting time and should alert them taking into account the time they need to get to the shop from the place they currently are (to avoid situations where a customer approaches the store too late/early).

- The stores should still use fallback options for those people who do not have access to the required tecnology, for example handing out "queue tickets" on the spot.

## 5. Effort Spent

### Ferrara Alessandro
| Topic                         |      Hours |
|:------------------------------|-----------:|
| Discussion on the first part  |       1.5h |
<br>

### Fratus Lorenzo
| Topic                         |      Hours |
|:------------------------------|-----------:|
| Discussion on the first part  |       1.5h |
<br>

## 6. References
- Slides