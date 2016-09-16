export interface UnallocatedTransaction {
    filing_code: string;
    acquirer_amount_presented: string;
    acquirer_amount_presented_currency: string;
    acquirer_estimated_settlement_value: string;
    acquirer_estimated_settlement_value_currency: string;
    acquirer_exchange_rate: string;
    acquirer_discount_rate: string;
    acquirer_transaction_fee: string;
    acquirer_transaction_fee_currency: string;
    acquirer_commission: string;
    acquirer_commission_currency: string;
    partial_pan: string;
    card_type: string;
    transaction_date: string;
}
