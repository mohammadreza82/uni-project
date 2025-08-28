// import { Component, OnInit } from '@angular/core';
// import { SharedModule } from "../../shared/shared.module";
// import { PurchasesService } from '../../services/purchases.service';
// import { DatePipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
// import { ITransactions } from '../../interfaces/interfaces';
// import { MessageService } from '../../services/message.service';
// import { ModalService } from '../../services/modal.service';
// import { TasksService } from '../../services/tasks.service';

// @Component({
//   selector: 'app-purchases',
//   imports: [SharedModule, FormsModule, NzDatePickerModule, ],
//   templateUrl: './purchases.component.html',
//   styleUrl: './purchases.component.scss'
// })
// // purchases.component.ts
// export class PurchasesComponent implements OnInit {
//   listOfPurchases: any[] = [];
//   purchasesData: any[] = [];
//   isEditModalvisible: boolean = false;
//   isDeleteModalvisible: boolean = false;

//   // Filter Table data
//   categories: any[] = [];
//   filteredData: any[] = [];



//   activeModalId: string | null = null;
//   rowData: any = null;


//   // Edit inps
//   taskNameId: number = 0
//   taskNameVal?: string;
//   date: string = '';
//   costVal: number | null = null;


//   columns = [
//     {
//       title: 'Task Name',
//       key: 'task_name_display',
//       sort: false,
//       filter: [
//         { text: 'Task A', value: 'Task A' },
//         { text: 'Task B', value: 'Task B' },
//         { text: 'Task C', value: 'Task C' }
//       ]
//     },
//     { title: 'Cost', key: 'cost', sort: false, pipe: { name: 'currency', params: { symbol: '$', digits: 2 } } },
//     {
//       title: 'Purchase Date',
//       key: 'purchase_date',
//       sort: false,
//       pipe: { name: 'date', params: { format: 'yyyy/MM/dd' } }
//     }
//   ];
//   loading = false;
//   pageSize = 5;
//   pageIndex = 1;

//   constructor(
//     private purchasesService: PurchasesService,
//     private modal: ModalService,
//     private messageService: MessageService,
//     private tasksService: TasksService
//   ) { }

//   ngOnInit(): void {
//     this.fetchPurchases();

//   this.tasksService.getTasks().subscribe((res: any[]) => {
//     this.categories = res.map(item => item.name);

//     const taskNameCol = this.columns.find(c => c.key === 'task_name_display');
//     if (taskNameCol) {
//       taskNameCol.filter = this.categories.map(name => ({
//         text: name,
//         value: name
//       }));
//     }
//   });
//   }

//   fetchPurchases(): void {
//   this.loading = true;
//   this.purchasesService.getAllTrans().subscribe(
//     data => {
//       this.listOfPurchases = data;
//       this.filteredData = data; 
//       this.loading = false;
//     },
//     error => {
//       console.error('Error fetching purchases:', error);
//       this.loading = false;
//     }
//   );
// }


//   handleQueryParamsChange(params: any) {
//  const { filter } = params;

//   const taskNameFilter = filter.find((f: any) => f.key === 'task_name_display')?.value || [];

//   this.filteredData = this.listOfPurchases.filter((item) => {
//     const matchesTask = taskNameFilter.length === 0 || taskNameFilter.includes(item.task_name_display);
//     return matchesTask;
//   });

//   }

//   datePickerHandler(result: Date): void {
//     console.log('onChange: ', result);
//   }


//   // Modals
//   toggleModal(event: Event, modalId: string): void {
//     event.preventDefault();
//     this.modal.toggleModal(modalId);
//   }

//   // Edit Trans/Task
//   editModalOpen(data: ITransactions) {
//     this.rowData = data;
//     this.costVal = data.cost;
//     this.date = data.purchase_date;
//     this.taskNameVal = data.task_name_display;
//     this.modal.toggleModal('edit');
//     console.log(this.taskNameVal);


//   }

//   onEditConfirmed(isConfirmed: boolean) {
//     if (this.rowData && isConfirmed) {
//       const data = {
//         "cost": this.costVal!,
//         "purchase_date": this.date!,
//         "task_name": this.taskNameId!
//       }
//       this.purchasesService.editTrans(this.rowData.id, data).subscribe({
//         next: () => {
//           console.log(JSON.stringify(data));

//           // this.toggleModal('edit', false);
//           this.rowData = null;
//           this.messageService.show('success', 'Edit successfully');
//           this.fetchPurchases();
//         },
//         error: () => {
//           this.messageService.show('error', 'Edit failed')
//           this.rowData = null;
//         }
//       })
//     }
//   }


//   // Delete Trans/Task
//   deleteModalOpen(data: any) {
//     this.rowData = data
//     this.modal.toggleModal('delete');
//     // console.log(data, 'row data from parent');
//   }

//   onDeleteConfirmed(isConfirmed: boolean): void {
//     if (this.rowData && isConfirmed) {
//       const id = this.rowData.id;
//       this.purchasesService.deleteTrans(id).subscribe({
//         next: () => {
//           this.modal.toggleModal('delete');
//           this.rowData = null;
//           this.messageService.show('success', 'Deleted successfully');
//           this.fetchPurchases();
//         },
//         error: () => {
//           this.messageService.show('error', 'Delete failed')
//           this.rowData = null;
//         }
//       });
//     }
//   }

// }


