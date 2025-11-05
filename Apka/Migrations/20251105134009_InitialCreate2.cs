using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Apka.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PageNymber",
                table: "Pages",
                newName: "PageNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PageNumber",
                table: "Pages",
                newName: "PageNymber");
        }
    }
}
