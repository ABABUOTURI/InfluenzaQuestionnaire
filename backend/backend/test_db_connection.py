import pyodbc

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=ABABU-OTURI;"  # Replace with actual server name
    "DATABASE=kemri;"
    "Trusted_Connection=yes;"
)

cursor = conn.cursor()
cursor.execute("SELECT name FROM sys.tables;")
for row in cursor.fetchall():
    print(row)
