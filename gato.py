import os

# Base de datos local (funciona sin internet)
veterinarias = [
    {"distrito": "CALLAO", "nombre": "Veterinaria Municipal Callao", "info": "Campañas en AA.HH Santa Rosa. Costo: Social/Gratuito."},
    {"distrito": "CALLAO", "nombre": "Sede Mi Perú - Gavet", "info": "Av. Mi Perú. Atención económica y campañas."},
    {"distrito": "CHORRILLOS", "nombre": "Posta Veterinaria Delicias", "info": "Av. Cordillera Central. Esterilización aprox. S/ 40."},
    {"distrito": "VILLA EL SALVADOR", "nombre": "Hospital Veterinario Oasis", "info": "Sector 9, Grupo 4. Esterilización gatas aprox. S/ 40."},
    {"distrito": "COMAS", "nombre": "Posta Veterinaria Comas", "info": "Av. Universitaria Cdra 70. Esterilización desde S/ 40."},
    {"distrito": "CERCADO DE LIMA", "nombre": "Clínica Veterinaria Carbajal", "info": "Campañas frecuentes desde S/ 99 (incluye post-operatorio)."},
    {"distrito": "SAN JUAN DE LURIGANCHO", "nombre": "Posta Adopta una Mascota", "info": "Segunda de Bayóvar. Precios sociales y campañas."},
    {"distrito": "CARABAYLLO", "nombre": "Gavet (Sede Chimpu Ocllo)", "info": "Paradero Estación Terminal. Especialistas en felinos."},
]

def buscar():
    os.system('clear')
    print("="*40)
    print(" BUSCADOR DE ESTERILIZACIÓN - LIMA/CALLAO ")
    print("="*40)
    query = input("Escribe el DISTRITO o 'todos': ").strip().upper()
    
    encontrados = [v for v in veterinarias if query in v['distrito'] or query == "TODOS"]
    
    if encontrados:
        print(f"\nSe encontraron {len(encontrados)} opciones:\n")
        for v in encontrados:
            print(f"📍 [{v['distrito']}]")
            print(f"🏠 {v['nombre']}")
            print(f"ℹ️  {v['info']}")
            print("-" * 30)
    else:
        print("\n❌ No se encontraron resultados para ese distrito.")
    
    input("\nPresiona Enter para volver a buscar...")
    buscar()

if __name__ == "__main__":
    try:
        buscar()
    except KeyboardInterrupt:
        print("\nSaliendo...")
