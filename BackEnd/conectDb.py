#!/usr/bin/python
import psycopg2
from psycopg2.extras import RealDictCursor
from config import config
import json
 
def connect(query, tugas):
    """ Connect to the PostgreSQL database server """
    conn = None
    result = []
    try:
        # read connection parameters
        params = config()
 
        # connect to the PostgreSQL server
        # print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
 
        # create a cursor
        cur = conn.cursor(cursor_factory=RealDictCursor)
        # execute a statement
        cur.execute(query)
        
        if tugas == 'GET' :
            columns = ('id', 'oid', 'root', 'approved', 'name')
            result = json.dumps(cur.fetchall(), indent=2)
        else :    
            # display the PostgreSQL database server version
            result = cur.fetchone()
       
        # commit the changes to the database
        conn.commit()
        # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print('ini error = ', error)
    finally:
        if conn is not None:
            conn.close()
        return str(result)
 
 
# if __name__ == '__main__':
#     connect()