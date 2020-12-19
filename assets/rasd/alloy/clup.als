abstract sig TimeSlotState {}
one sig Free extends TimeSlotState {}
one sig Full extends TimeSlotState {}

abstract sig TicketState {}
one sig Waiting extends TicketState {}
one sig Inside extends TicketState {}

abstract sig StoreState {}
one sig Accessible extends StoreState {}
one sig Inaccessible extends StoreState {}

sig Queue {
    store: one Store,
    waiting: seq QueueTicket,
}
pred Queue.contains [qt: QueueTicket] {
    qt in this.waiting.elems
}

sig TimeSlot {
    status: one TimeSlotState,
    store: one Store,
    index: one Int,
    capacity: one Int,
    bookings: set BookingTicket,
}
pred TimeSlot.contains [bt: BookingTicket] {
    bt in this.bookings
}
pred TimeSlot.isFree {
    this.status = Free
}

abstract sig Ticket {
    status: one TicketState,
}
sig QueueTicket extends Ticket {
    queue: one Queue,
}
sig BookingTicket extends Ticket {
    timeSlot: one TimeSlot,
}
pred Ticket.isWaiting {
    this.status = Waiting
}
pred Ticket.isInside {
    not this.isWaiting
}
pred BookingTicket.isCurrent {
    this.timeSlot = this.store.current
}
pred BookingTicket.overlaps [other: BookingTicket] {
    this.timeSlot.index = other.timeSlot.index
}
fun QueueTicket.store: one Store {
    this.queue.store
}
fun BookingTicket.store: one Store {
    this.timeSlot.store
}

sig Store {
    status: one StoreState,
    capacity: one Int,
    queue: one Queue,
    timeSlots: seq TimeSlot,
    inside: set Ticket,
}
pred Store.isAccessible {
    this.status = Accessible
}
pred Store.offers [ts: TimeSlot] {
    ts in this.timeSlots.elems
}
pred Store.letIn [t: Ticket] {
    t in this.inside
}
fun Store.current: one TimeSlot {
    this.timeSlots.first
}
fun Store.idxOf [ts: TimeSlot]: one Int {
    this.timeSlots.idxOf[ts]
}

abstract sig User {}
sig StoreManager extends User {
    store: one Store,
    tickets: set QueueTicket,
}
sig Clupper extends User {
    queue: lone QueueTicket,
    bookings: set BookingTicket,
}
pred StoreManager.issued [t: Ticket] {
    t in this.tickets
}
pred Clupper.requested [t: Ticket] {
    t in (this.queue + this.bookings)
}

//Associations between signatures
fact oneQueuePerQueueTicket {
    all qt: QueueTicket, q: Queue | 
        q.contains[qt] iff (qt.isWaiting and qt.queue = q)
}
fact oneTimeSlotPerBookingTicket {
    all bt: BookingTicket, ts: TimeSlot | 
        ts.contains[bt] iff (bt.isWaiting and bt.timeSlot = ts)
}
fact oneUserPerTicket {
    all qt: QueueTicket | (
            (one sm: StoreManager | sm.issued[qt]) and
            (no c: Clupper | c.requested[qt])
        ) or (
            (no sm: StoreManager | sm.issued[qt]) and
            (one c: Clupper | c.requested[qt])
        )
    
    all bt: BookingTicket |
        one c: Clupper | c.requested[bt]
}
fact oneStorePerStoreManager {
    all s: Store | one sm: StoreManager | sm.store = s
}
fact storeManagerIssuesTicketsFromThatStore {
    all sm: StoreManager | all qt: sm.tickets | qt.store = sm.store
}
fact storeTicketInsideCondition {
    all s: Store, qt: QueueTicket |
        s.letIn[qt] iff (qt.isInside and qt.store = s)

    all s: Store, bt: BookingTicket |
        s.letIn[bt] iff (bt.isInside and bt.store = s)
}
fact oneStorePerQueue {
    all s: Store, q: Queue | s.queue = q iff q.store = s
}
fact oneStorePerTimeSlot {
    all s: Store, ts: TimeSlot | s.offers[ts] iff ts.store = s
}

//Queue constraints
fact disjointTicketsInQueue {
    no q: Queue | q.waiting.hasDups
}

//TimeSlot constraints
fact disjointBookingsInTimeSlot {
    all ts: TimeSlot | no disj bt1, bt2: ts.bookings | bt1 = bt2
}
fact bookingsFromSameStoreInTimeSlot {
    all ts: TimeSlot, bt: ts.bookings | bt.store = ts.store
}
fact capacityValueInTimeSlot {
    all ts: TimeSlot | ts.capacity = div[ts.store.capacity, 4]
}
fact maxNumberOfBookingsPerTimeSlot {
    all ts: TimeSlot | ts.capacity >= #ts.bookings
}
fact freeTimeSlotCondition {
    all ts: TimeSlot | ts.isFree iff #ts.bookings < ts.capacity
}

//BookingTicket constraints 
fact canBeInsideDuringCurrentTimeSlot {
    all bt: BookingTicket | bt.isInside implies bt.isCurrent
}

//Store constraints
fact disjointNonEmptyTimeSlotsInStore {
    no s: Store | s.timeSlots.isEmpty or s.timeSlots.hasDups
}
fact consecutiveTimeSlotsInStore {
    all s: Store, ts: s.timeSlots.elems |
        ts.index = plus[s.current.index, s.idxOf[ts]]
}
fact nonNegativeCapacityInStore {
    all s: Store | s.capacity > 0
}
fact maxNumberOfInsidePerStore {
    all s: Store | s.capacity >= plus[(#s.inside), (#s.current.bookings)]
}
fact accessibleStoreCondition {
    all s: Store | s.isAccessible iff #s.inside < s.capacity
}

//Clupper constraints
fact noOverlappingBookingsForClupper {
    all c: Clupper | no disj bt1, bt2: c.bookings | bt1.overlaps[bt2]
}
fact oneInsideTicketAtATime {
    all c: Clupper | lone t: Ticket | c.requested[t] and t.isInside
}

pred show {
    //Constraints to generate a more interesting world
    #Clupper >= 4
    #StoreManager = 1
    #QueueTicket = 4
    #BookingTicket = 4
    #TimeSlot >= 3
    all s: Store | s.capacity >= 4
    some c: Clupper, qt: QueueTicket | c.requested[qt]
}

run show for 10
