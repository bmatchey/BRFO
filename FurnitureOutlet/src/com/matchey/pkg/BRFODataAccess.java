package com.matchey.pkg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.logging.Level;
import java.util.logging.Logger;

public class BRFODataAccess extends PostGreDataAccess
{

	public static String GetStores()
	{
		return QueryToJSON("select * from stores");
	}
	
	public static String GetCategories()
	{
		return QueryToJSON("select * from categories");
	}
	
	public static String GetPictureInfo(String maxPics)
	{
		return QueryToJSON("select pictureid,filenameandexternsion,filetype,uploadeddate,takendate,description from pictures order by pictureid desc limit " + maxPics);
	}
	
	public static int InsertPicture(String filenameandexternsion, String lastModifiedDate, String fileType, byte[] data) throws AppServiceException
	{
		Connection con = createConnection();
		PreparedStatement pst = null;
		try
		{
			// Make sure your JavaScript uses dateFormat('your date/time', "default").
			SimpleDateFormat dateFormat = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss"); 
			java.util.Date parsedDate = dateFormat.parse(lastModifiedDate);
			
			pst = con.prepareStatement(
					"INSERT INTO pictures(filenameandexternsion,filetype,pictureblob,uploadeddate,takendate) VALUES(?,?,?,?,?)");
			
			pst.setString(1, filenameandexternsion);
			pst.setString(2, fileType);
			pst.setBytes(3, data);
			pst.setTimestamp(4, new Timestamp(System.currentTimeMillis()));
			pst.setTimestamp(5, new Timestamp(parsedDate.getTime()));
			
            return pst.executeUpdate();            
		}
		catch (SQLException ex)
		{
			Logger.getLogger(BRFODataAccess.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
			throw new AppServiceException(ex.getMessage());
		}
		catch (ParseException ex)
		{
			Logger.getLogger(BRFODataAccess.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
			throw new AppServiceException(ex.getMessage());
		}
		finally
		{
			closeConnection(con, pst, null);
		}
	}
	
	public static byte[] GetPictureById(int picId) throws AppServiceException
	{
		Connection con = createConnection();
		ResultSet rs = null;
		Statement st = null;
		try
		{
			st = con.createStatement();
			rs = st.executeQuery("SELECT pictureblob FROM pictures where pictureid = " + picId);

			if (rs.next())
			{
				return rs.getBytes(1);
			}
		}
		catch (SQLException ex)
		{
			Logger.getLogger(BRFODataAccess.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
			throw new AppServiceException(ex.getMessage());
		}
		finally
		{
			closeConnection(con, st, rs);
		}
		
		return null;
	}
	
	public static String GetPictureTypeById(int picId) throws AppServiceException
	{
		Connection con = createConnection();
		ResultSet rs = null;
		Statement st = null;
		try
		{
			st = con.createStatement();
			rs = st.executeQuery("SELECT filetype FROM pictures where pictureid = " + picId);

			if (rs.next())
			{
				return rs.getString(1);
			}
		}
		catch (SQLException ex)
		{
			Logger.getLogger(BRFODataAccess.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
			throw new AppServiceException(ex.getMessage());
		}
		finally
		{
			closeConnection(con, st, rs);
		}
		
		return null;
	}
	
}
