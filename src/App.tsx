import { transactions } from "./data/data";
import BasicLayout from "./Layouts/BasicLayout";
import { TransactionTable } from "./components/transaction/TransactionTable";

export default function App() {
  return (
    <BasicLayout>
      <TransactionTable data={transactions} />
    </BasicLayout>
  );
}
