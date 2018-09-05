export class AccountBalance {
    constructor(
        public BalanceID: number,
        public BalanceDate: Date,
        public BalanceRAD: number,
        public BalanceCanteen: number,
        public BalanceCEOCar: number,
        public BalanceMarketing: number,
        public BalanceParkingFines: number,
    ) { }
}