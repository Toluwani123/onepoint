# Generated by Django 4.1.6 on 2023-03-06 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_alter_product_category"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="productimages/"),
        ),
        migrations.AlterField(
            model_name="product",
            name="thumbnail",
            field=models.ImageField(blank=True, null=True, upload_to="productimages/"),
        ),
    ]
