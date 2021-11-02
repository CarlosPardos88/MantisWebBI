using EntitiesTD;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Windows;

namespace BIDAL
{
    public class Rel_ProgramacionPeriodica_DiaSemanaDAL
    {
        public List<Rel_ProgramacionPeriodica_DiaSemana> GetRelProDiaSemana()
        {
            List<Rel_ProgramacionPeriodica_DiaSemana> list = new List<Rel_ProgramacionPeriodica_DiaSemana>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("SELECT * From OPE_Rel_ProgramacionPeriodica_DiaSemana; ", connection);
                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            list.Add(new Rel_ProgramacionPeriodica_DiaSemana()
                            {
                                Id_ProgramacionPeriodica = int.Parse(reader["Id_ProgramacionPeriodica"].ToString()),
                                Id_DiaSemana = int.Parse(reader["Id_DiaSemana"].ToString())
                            });

                        }
                    }
                    reader.Close();
                    command.Dispose();
                    if (connection.State == System.Data.ConnectionState.Open)
                    {
                        
                    }
                    
                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                connection.Close();
            }
            return list;
        }



        public int Post_RelProDiaSemana(Rel_ProgramacionPeriodica_DiaSemana rel_ProgramacionPeriodica_DiaSemana)
        {

            int result = -1;
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();


                    SqlCommand command = new SqlCommand("Insert into OPE_Rel_ProgramacionPeriodica_DiaSemana"
                                                    + "(Id_ProgramacionPeriodica, Id_DiaSemana) " + "Values"
                                                  + "(@IdPP, @IdDS);", connection);

                    SqlParameter parameterIdPP = new SqlParameter("@IdPP", SqlDbType.Int);
                    parameterIdPP.Value = rel_ProgramacionPeriodica_DiaSemana.Id_ProgramacionPeriodica;

                    SqlParameter parameterIdDS = new SqlParameter("@IdDS", SqlDbType.Int);
                    parameterIdDS.Value = rel_ProgramacionPeriodica_DiaSemana.Id_DiaSemana;

                    command.Parameters.AddWithValue("@IdPP", rel_ProgramacionPeriodica_DiaSemana.Id_ProgramacionPeriodica);
                    command.Parameters.AddWithValue("@IdDS", rel_ProgramacionPeriodica_DiaSemana.Id_DiaSemana);

                    SqlDataReader reader = command.ExecuteReader();
                    reader.Close();
                    command.Dispose();
                    connection.Close();
                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }
            }
            return result;
        }

        public int Post_RelProDiaSemanaIds(int IdPro, int IdDia)
        {

            int result = -1;
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();


                    SqlCommand command = new SqlCommand("Insert into OPE_Rel_ProgramacionPeriodica_DiaSemana"
                                                    + "(Id_ProgramacionPeriodica, Id_DiaSemana) " + "Values"
                                                  + "(@IdPP, @IdDS);", connection);

                    SqlParameter parameterIdPP = new SqlParameter("@IdPP", SqlDbType.Int);
                    parameterIdPP.Value = IdPro;

                    SqlParameter parameterIdDS = new SqlParameter("@IdDS", SqlDbType.Int);
                    parameterIdDS.Value = IdDia;

                    command.Parameters.AddWithValue("@IdPP", IdPro);
                    command.Parameters.AddWithValue("@IdDS", IdDia);

                    SqlDataReader reader = command.ExecuteReader();
                    reader.Close();
                    command.Dispose();
                    connection.Close();
                }
                catch (SqlException exception)
                {
                    MessageBox.Show(exception.Message);
                }

                catch (DataException exception)
                {
                    MessageBox.Show(exception.Message);
                }
            }
            return result;
        }


        public List<Rel_ProgramacionPeriodica_DiaSemana> Delete_RelProDiaSemana(int id)
        {

            //List<string> list = new List<string>();
            List<Rel_ProgramacionPeriodica_DiaSemana> list = new List<Rel_ProgramacionPeriodica_DiaSemana>();
            string connectionString = ConfigurationManager.ConnectionStrings["EntitiesSQL"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("Delete From OPE_Rel_ProgramacionPeriodica_DiaSemana where Id_ProgramacionPeriodica=@Id;", connection);

                    SqlParameter parameterId = new SqlParameter("@Id", SqlDbType.Int)
                    {
                        Value = id
                    };

                    command.Parameters.AddWithValue("@Id", id);

                    // command.ExecuteNonQuery();
                    int n = command.ExecuteNonQuery();
                    if (n > 0)
                    {
                        list.Add(new Rel_ProgramacionPeriodica_DiaSemana()
                        {
                            Id_ProgramacionPeriodica = id,
                            eliminados = n,
                            mensaje = "Se eliminaron los registros con exito"

                        });

                    }
                    else
                    {

                        list.Add(new Rel_ProgramacionPeriodica_DiaSemana()
                        {
                            Id_ProgramacionPeriodica = id,
                            eliminados = n,
                            mensaje = "No se encontraron registros a eliminar"

                        });
                    }
                    command.Dispose();
                    connection.Close();

                }
                catch (SqlException)
                {
                    list.Add(new Rel_ProgramacionPeriodica_DiaSemana()
                    {
                        eliminados = -1,
                        mensaje = "Ocurrio un error"

                    });
                }

                catch (DataException)
                {
                    list.Add(new Rel_ProgramacionPeriodica_DiaSemana()
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
