package com.matchey.pkg;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PostGreDataAccess
{
	public static Connection createConnection(String dbUrl, String dbusername, String dbPassword)
	{
		try
		{
			Class.forName("org.postgresql.Driver");
			return DriverManager.getConnection(dbUrl, dbusername, dbPassword);
		}
		catch (Exception ex)
		{
			Logger.getLogger(PostGreDataAccess.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
			return null;
		}
	}

	public static Connection createConnection()
	{
		String url = "jdbc:postgresql://localhost:5432/TestStore";  // TODO: Get this from configuration.
		String user = "postgres";
		String password = "";
		return createConnection(url, user, password); 		
	}
	
	public static void closeConnection(Connection con)
	{
		if (con != null)
		{
			try
			{
				con.close();
			}
			catch (SQLException ex)
			{
				Logger.getLogger(PostGreDataAccess.class.getName()).log(Level.WARNING, ex.getMessage(), ex);
			}
		}

	}

	public static void closeConnection(Connection con, Statement st, ResultSet rs)
	{
		try
		{
			if (rs != null)
			{
				rs.close();
			}
			if (st != null)
			{
				st.close();
			}
			if (con != null)
			{
				con.close();
			}
		}
		catch (SQLException ex)
		{
			Logger lgr = Logger.getLogger(PostGreDataAccess.class.getName());
			lgr.log(Level.WARNING, ex.getMessage(), ex);
		}
	}
		
	private static ResultSet executeQuery(Connection con, String sql)
	{
		Statement st = null;
		ResultSet rs = null;
	
		if (con != null)
		{
			try
			{
				st = con.createStatement();
				rs = st.executeQuery(sql);

				if (rs.next())
				{
					return rs;  // TODO: This is a hack - it's never close.
				}
			}
			catch (SQLException ex)
			{
				Logger lgr = Logger.getLogger(PostGreDataAccess.class.getName());
				lgr.log(Level.SEVERE, ex.getMessage(), ex);
			}
		}
		
		return null;
	}

	private static ResultSet executeQuery(String sql)
	{
		Connection con = createConnection();
		try
		{
			return executeQuery(con, sql);
		}
		finally
		{
			closeConnection(con);
		}
	}

	public static String GetVersion()
	{
		ResultSet rs = executeQuery("SELECT VERSION()");
		if (rs != null)
		{
			try
			{
				return rs.getString(1);
			}
			catch (SQLException ex)
			{
				Logger lgr = Logger.getLogger(PostGreDataAccess.class.getName());
				lgr.log(Level.WARNING, ex.getMessage(), ex);
			}
		}
		
		return "";
	}

	public static String QueryToJSON(String sql)
	{
		String jsonSql = "select array_to_json(array_agg(row_to_json(rows))) from (" + sql + ") rows";
		
		ResultSet rs = executeQuery(jsonSql);
		if (rs != null)
		{
			try
			{
				return rs.getString(1);
			}
			catch (SQLException ex)
			{
				Logger lgr = Logger.getLogger(PostGreDataAccess.class.getName());
				lgr.log(Level.SEVERE, ex.getMessage(), ex);
			}
		}
		
		return "";
	}
		
}
