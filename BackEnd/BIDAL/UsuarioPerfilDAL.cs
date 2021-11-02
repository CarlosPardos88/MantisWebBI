using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Windows;


namespace BIDAL
{
    public class UsuarioPerfilDAL
    {
        public List<UsuarioPerfil> GetUsuarioPerfil(string usuario)
        {
            List<UsuarioPerfil> list = new List<UsuarioPerfil>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("SELECT " +
                        "U.Id_Usuario, " +
                        "U.Nombre_Usuario, " +
                        "A.Id_AreaNegocio, " +
                        "A.Nombre_AreaNegocio, " +
                        "P.Id_PerfilUsuario, " +
                        "P.Desc_PerfilUsuario, " +
                        "U.Desc_JSONMenuUsuario " +
                        "FROM OPE_Usuario AS U " +
                        "JOIN OPE_PerfilUsuario AS P " +
                        "   ON U.Id_PerfilUsuario = P.Id_PerfilUsuario " +
                        "LEFT JOIN OPE_AreaNegocio AS A" +
                        "   ON A.Id_AreaNegocio = U.Id_AreaNegocio " +
                        "WHERE U.Nombre_Usuario = @user ", connection);

                    SqlParameter user = new SqlParameter("@user", SqlDbType.VarChar)
                    {
                        Value = usuario
                    };

                    command.Parameters.AddWithValue("@user", usuario);
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            list.Add(new UsuarioPerfil()
                            {
                                Id_Usuario = reader["Id_Usuario"].ToString(),
                                Nombre_Usuario = reader["Nombre_Usuario"].ToString(),
                                Id_AreaNegocio = reader["Id_AreaNegocio"].ToString(),
                                Nombre_AreaNegocio = reader["Nombre_AreaNegocio"].ToString(),
                                Id_PerfilUsuario = reader["Id_PerfilUsuario"].ToString(),
                                Desc_PerfilUsuario = reader["Desc_PerfilUsuario"].ToString(),
                                Desc_JSONMenuUsuario = reader["Desc_JSONMenuUsuario"].ToString()
                            });
                        }
                    }
                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {
                    }
                }
                catch (FormatException e)
                {
                    MessageBox.Show(e.Message);
                }
                catch (DataException e)
                {
                    MessageBox.Show(e.Message);
                }
                catch (InsufficientMemoryException e)
                {
                    MessageBox.Show(e.Message);
                }
                catch (SqlException e)
                {
                    MessageBox.Show(e.Message);
                }

                connection.Close();
            }
            return list;
        }
    }
}
