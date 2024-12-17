using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dbInthouseContext.Migrations
{
    /// <inheritdoc />
    public partial class _002 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statistics_InthouseProp_TK_Inthouse_ID",
                table: "Statistics");

            migrationBuilder.AlterColumn<int>(
                name: "TK_Inthouse_ID",
                table: "Statistics",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Statistics_InthouseProp_TK_Inthouse_ID",
                table: "Statistics",
                column: "TK_Inthouse_ID",
                principalTable: "InthouseProp",
                principalColumn: "InHouse_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statistics_InthouseProp_TK_Inthouse_ID",
                table: "Statistics");

            migrationBuilder.AlterColumn<int>(
                name: "TK_Inthouse_ID",
                table: "Statistics",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Statistics_InthouseProp_TK_Inthouse_ID",
                table: "Statistics",
                column: "TK_Inthouse_ID",
                principalTable: "InthouseProp",
                principalColumn: "InHouse_ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
