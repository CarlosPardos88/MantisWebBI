using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Windows;

namespace BIDAL
{
    public class RelProSisDAL
    {
    public List<RelProcSist> GetRelProcs()
        {
            List<RelProcSist> list = new List<RelProcSist>();
        string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
       using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("SELECT * From OPE_Rel_Proceso_SistemaFuente; ", connection);
                     SqlDataReader reader = command.ExecuteReader();
                     if (reader.HasRows)
                     {
                         while (reader.Read())
                         {
                             list.Add(new RelProcSist()
                             {
                                 Id_SistemaFuente = int.Parse(reader["Id_SistemaFuente"].ToString()),
                                 Id_Proceso = int.Parse(reader["Id_Proceso"].ToString())
                             });

                         }
                     }
                     reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                   {
                        Console.WriteLine("conexion exitosa");
                    }
                }
                catch (Exception exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Dispose();
                connection.Close();
            }
            return list;
        }


        public int Post_RelProcSist(RelProcSist relProcSist)
        {

            int result = -1;
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();

            
                        SqlCommand command = new SqlCommand("Insert into OPE_Rel_Proceso_SistemaFuente"
                                                        + "(Id_SistemaFuente, Id_Proceso) " + "Values"
                                                      + "(" + relProcSist.Id_SistemaFuente + "," + relProcSist.Id_Proceso + ");", connection);
                       
                        SqlDataReader reader = command.ExecuteReader();
                        reader.Close();

                    command.Dispose();
                    connection.Close();
                 }
                catch (Exception exception)
                {
                    MessageBox.Show(exception.Message);
                }
            }
            return result;
        }

        public List<RelProcSist> Delete_RelProcSist(int id)
        {

            //List<string> list = new List<string>();
            List<RelProcSist> list = new List<RelProcSist>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("Delete From OPE_Rel_Proceso_SistemaFuente where Id_Proceso=" + id + " ;", connection);
                   // command.ExecuteNonQuery();
                    int n =  command.ExecuteNonQuery();
                    if (n > 0)
                    {
                        list.Add(new RelProcSist()
                        {
                            Id_Proceso = id,
                            eliminados = n,
                            mensaje = "Se eliminaron los registros con exito"

                        });

                    }
                    else {

                        list.Add(new RelProcSist()
                        {
                            Id_Proceso = id,
                            eliminados = n,
                            mensaje = "No se encontraron registros a eliminar"

                        });
                    }
                    command.Dispose();
                    connection.Close();
                
                }
                catch (Exception)
                {
                    list.Add(new RelProcSist()
                    {
                          eliminados = -1,
                          mensaje = "Ocurrio un error"

                    });
                }
            }
            return list;
        }

    }

 

}
