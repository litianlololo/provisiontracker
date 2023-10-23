// class Member {
//     readonly name: string;
//     readonly pwd: string;
//     // 其他成员属性
//   }
  
// export class CreateTeamDto {
//     readonly name: string;
//     readonly admin_id: string;
//     readonly company: string;
//     readonly members: Member[];
// }
export class CreateTeamDto {
  readonly name: string;
  readonly admin_id: string;
  readonly company: string;
  readonly members: string[];
}
